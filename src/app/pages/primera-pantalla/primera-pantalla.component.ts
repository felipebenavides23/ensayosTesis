import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IdataEnsayos } from 'src/app/module/prubas';

@Component({
  selector: 'app-primera-pantalla',
  templateUrl: './primera-pantalla.component.html',
  styleUrls: ['./primera-pantalla.component.css'],
})
export class PrimeraPantallaComponent implements OnInit {
  @Input() dataPrueba: IdataEnsayos;
  @Output() estadaPantalla = new EventEmitter<boolean>();

  ngOnInit() {
    this.tiempoEspara();
  }

  tiempoEspara() {
    setTimeout(() => {
      this.estadaPantalla.emit(false);
    }, 2500);
  }
}
