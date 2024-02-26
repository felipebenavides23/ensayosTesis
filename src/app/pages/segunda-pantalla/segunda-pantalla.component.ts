import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  IdataEnsayos,
  ETipoRiesgos,
  ETipoEnsayos,
} from 'src/app/module/prubas';
import { ChartOptions } from 'chart.js';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-segunda-pantalla',
  templateUrl: './segunda-pantalla.component.html',
  styleUrls: ['./segunda-pantalla.component.css'],
})
export class SegundaPantallaComponent implements OnInit {
  tiempoInicial: any;

  @ViewChild('content', { static: false }) modal1: ElementRef;
  @Input() dataPrueba: IdataEnsayos;
  @Input() tipoPrueba: string;
  @Input() index: number;
  @Input() cantidadDatos: number;
  @Output() respuesta = new EventEmitter();
  ETipoRiesgos = ETipoRiesgos;
  pieChartOptions: ChartOptions<'pie'>;
  pieChartLabels: string[];
  pieChartDatasets: any;
  pieChartLegend = true;
  pieChartPlugins = [];
  porcentajes: number[];

  constructor(private config: NgbModalConfig, private modalService: NgbModal) {
    this.pieChartOptions = {
      responsive: false,
    };
    this.pieChartLabels = ['% Perder', '% Ganar'];

    config.backdrop = 'static';
    config.keyboard = false;
  }
  ngOnInit(): void {
    this.iniciarTiempo();
    this.pieChartDatasets = [
      {
        data: this.Asignarporcentajes(),
        backgroundColor: ['#d30002', '#0c8310'],
      },
    ];
    this.validarPrueba();
  }
  open(content) {
    console.log(content);
    this.modalService.open(content);
  }

  validarPrueba() {
    if (this.tipoPrueba === ETipoEnsayos.VERIFICACION && this.index === 0) {
      setTimeout(() => {
        this.open(this.modal1);
      }, 500);
    }
  }

  Asignarporcentajes() {
    switch (this.dataPrueba.tipoRiesgo) {
      case this.ETipoRiesgos.BAJO:
        this.porcentajes = [30, 70];
        break;
      case this.ETipoRiesgos.MEDIO:
        this.porcentajes = [50, 50];
        break;
      case this.ETipoRiesgos.ALTA:
        this.porcentajes = [70, 30];

        break;
    }

    return this.porcentajes;
  }

  iniciarTiempo() {
    this.tiempoInicial = new Date().getTime();
  }

  detenerTiempo(estado) {
    let tiempoFinal = new Date().getTime();
    let tiempotrancurrido = tiempoFinal - this.tiempoInicial;
    let respuesta = {
      id: this.dataPrueba.prueba,
      respuesta: estado,
      tiempoUtilizado: tiempotrancurrido,
    };

    this.respuesta.emit(respuesta);
  }
}
