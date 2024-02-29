import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Iensayos, ETipoEnsayos } from '../module/prubas';
import { DatosService } from '../service/datos.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css'],
})
export class PagesComponent implements OnInit {
  @Input() tipoEnsayo: string;
  @Input() dataGeneral: any;
  @Input() dataEnsayo: Iensayos[];
  @Output() respuestasGeneral = new EventEmitter();
  numeroPrueba: number;
  datosEnsayos: Iensayos;
  verPantalla: boolean;
  respuestaPrueba: any[];
  ETipoEnsayos = ETipoEnsayos;
  dataTipoEnsayo: string;
  constructor(private api: DatosService) {
    this.numeroPrueba = 0;
    this.verPantalla = true;
    this.respuestaPrueba = [];
  }

  ngOnInit() {
    let dataEncontrada: Iensayos[];
    switch (this.tipoEnsayo) {
      case ETipoEnsayos.VERIFICACION:
        this.dataTipoEnsayo = ETipoEnsayos.VERIFICACION;
        dataEncontrada = this.dataEnsayo.filter(
          (ensayo) => ensayo.prueba === ETipoEnsayos.VERIFICACION
        );
        this.datosEnsayos = dataEncontrada[0];

        break;
      case ETipoEnsayos.ENTRENAMIENTO:
        this.dataTipoEnsayo = ETipoEnsayos.ENTRENAMIENTO;
        dataEncontrada = this.dataEnsayo.filter(
          (ensayo) => ensayo.prueba === ETipoEnsayos.VERIFICACION
        );
        this.datosEnsayos = dataEncontrada[0];

        break;
      case ETipoEnsayos.EXPERIMENTAL:
        this.dataTipoEnsayo = ETipoEnsayos.EXPERIMENTAL;
        dataEncontrada = this.dataEnsayo.filter(
          (ensayo) => ensayo.prueba === ETipoEnsayos.VERIFICACION
        );
        this.datosEnsayos = dataEncontrada[0];
        break;

      default:
        break;
    }
    this.datosAleatorios();
  }

  cambiarPantalla() {
    if (this.verPantalla) {
      this.verPantalla = false;
    } else {
      this.verPantalla = true;
    }
  }

  respuestas(event) {
    this.respuestaPrueba.push(event);
    this.numeroPrueba += 1;
    this.cambiarPantalla();
    let ensayo = this.dataGeneral?.ensayo ?? {};
    if (this.datosEnsayos.data.length === this.respuestaPrueba.length) {
      ensayo[this.dataTipoEnsayo] = this.respuestaPrueba;
      this.dataGeneral.ensayo = ensayo;
      this.respuestasGeneral.emit(this.dataGeneral);
    }
  }

  datosAleatorios() {
    let parcial = this.datosEnsayos.data;
    let guardar = [];
    for (let i = 0; i < this.datosEnsayos.data.length; i++) {
      let posicion = Math.floor(Math.random() * parcial.length);
      guardar.push(parcial[posicion]);
      parcial = parcial.filter((prueba) => prueba != parcial[posicion]);
    }
    this.datosEnsayos.data = guardar;
  }
}
