import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbModal, NgbModalConfig } from "@ng-bootstrap/ng-bootstrap";
import { Iensayos, ETipoEnsayos, Trespuesta } from "./module/prubas";
import { DatosService } from "./service/datos.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  @ViewChild("miBoton", { static: false }) miBoton: any;
  @ViewChild("BotonEntrenamiento", { static: false }) BotonEntrenamiento: any;
  @ViewChild("BotonExperimento", { static: false }) BotonExperimento: any;
  @ViewChild("content", { static: false }) modal1: ElementRef;

  estado: boolean;
  tipo: string;
  ETipoEnsayos = ETipoEnsayos;
  documentoForm: FormGroup;
  estadoBotones: boolean;
  posicionPopover: string;
  dataEnsayos: Iensayos[];
  dataGeneral: any = {};
  documentoValidar: { existe: boolean };

  title = "tesis";

  constructor(
    private formBuilder: FormBuilder,
    private config: NgbModalConfig,
    private modalService: NgbModal,
    private api: DatosService
  ) {
    this.estado = false;
    this.estadoBotones = false;
    config.backdrop = "static";
    config.keyboard = false;
  }
  ngOnInit() {
    this.generarFormulario();
    this.validarPantalla();
  }
  async verdatos() {
    try {
      let respuesta = (await this.api.listarEnsayos()) as Trespuesta;
      console.log(respuesta);
      this.dataEnsayos = respuesta.ensayos;
    } catch (error) {
      console.error(error);
    }
  }
  open(content) {
    console.log(content);
    this.modalService.open(content);
  }
  validarPantalla() {
    let anchoPantalla = window.innerWidth;
    if (anchoPantalla < 750) {
      this.posicionPopover = "top";
    } else {
      this.posicionPopover = "end";
    }
  }

  get documento() {
    return this.documentoForm.get("documento");
  }
  generarFormulario() {
    this.documentoForm = this.formBuilder.group({
      documento: [
        "",
        [
          Validators.required,
          Validators.pattern("^[0-9]*$"),
          Validators.minLength(6),
        ],
      ],
    });
  }
  async verificar(content) {
    if (this.documentoForm.valid) {
      this.documentoValidar = (await this.api.validarDocumento(
        this.documento.value
      )) as { existe: boolean };
      if (this.documentoValidar.existe) {
        this.open(this.modal1);
      } else {
        this.open(this.modal1);
        this.estadoBotones = true;
        this.dataGeneral.documento = this.documento.value;
        await this.verdatos();
      }
    }
  }
  tipoEnsayo(tipo: string) {
    this.tipo = tipo;
    this.estado = true;
  }
  reset() {
    this.estado = false;
  }

  async validarData(evento) {
    this.dataGeneral = evento;
    this.estado = false;
    this.estadoBotones = true;
    if (
      this.dataGeneral.ensayo.verificacion &&
      !this.dataGeneral.ensayo.entrenamiento
    ) {
      setTimeout(() => {
        this.simularClickEntre();
      }, 100);
    } else if (
      !this.dataGeneral.ensayo.experimentales &&
      this.dataGeneral.ensayo.entrenamiento
    ) {
      setTimeout(() => {
        this.simularClickExpe();
      }, 100);
    } else if (this.dataGeneral.ensayo.experimentales) {
      try {
        let respuesta = await this.api.guaradaRespuestas(this.dataGeneral);
        this.estadoBotones = false;
        setTimeout(() => {
          this.open(this.modal1);
        }, 100);
        this.documentoForm.reset();
      } catch (error) {
        console.error(error);
      }
    }
  }
  simularClick() {
    if (this.miBoton) {
      this.miBoton.nativeElement.click();
    } else {
      console.error("No se pudo encontrar el botón");
    }
  }
  simularClickEntre() {
    if (this.BotonEntrenamiento) {
      this.BotonEntrenamiento.nativeElement.click();
    } else {
      console.error("No se pudo encontrar el botón");
    }
  }
  simularClickExpe() {
    if (this.BotonExperimento) {
      this.BotonExperimento.nativeElement.click();
    } else {
      console.error("No se pudo encontrar el botón");
    }
  }
}
