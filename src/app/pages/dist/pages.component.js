"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PagesComponent = void 0;
var core_1 = require("@angular/core");
var prubas_1 = require("../module/prubas");
var PagesComponent = /** @class */ (function () {
    function PagesComponent(api) {
        this.api = api;
        this.respuestasGeneral = new core_1.EventEmitter();
        this.ETipoEnsayos = prubas_1.ETipoEnsayos;
        this.numeroPrueba = 0;
        this.verPantalla = true;
        this.respuestaPrueba = [];
    }
    PagesComponent.prototype.ngOnInit = function () {
        var dataEncontrada;
        switch (this.tipoEnsayo) {
            case prubas_1.ETipoEnsayos.VERIFICACION:
                this.dataTipoEnsayo = prubas_1.ETipoEnsayos.VERIFICACION;
                dataEncontrada = this.dataEnsayo.filter(function (ensayo) { return ensayo.prueba === prubas_1.ETipoEnsayos.VERIFICACION; });
                this.datosEnsayos = dataEncontrada[0];
                break;
            case prubas_1.ETipoEnsayos.ENTRENAMIENTO:
                this.dataTipoEnsayo = prubas_1.ETipoEnsayos.ENTRENAMIENTO;
                dataEncontrada = this.dataEnsayo.filter(function (ensayo) { return ensayo.prueba === prubas_1.ETipoEnsayos.ENTRENAMIENTO; });
                this.datosEnsayos = dataEncontrada[0];
                break;
            case prubas_1.ETipoEnsayos.EXPERIMENTAL:
                this.dataTipoEnsayo = prubas_1.ETipoEnsayos.EXPERIMENTAL;
                dataEncontrada = this.dataEnsayo.filter(function (ensayo) { return ensayo.prueba === prubas_1.ETipoEnsayos.EXPERIMENTAL; });
                this.datosEnsayos = dataEncontrada[0];
                break;
            default:
                break;
        }
        this.datosAleatorios();
    };
    PagesComponent.prototype.cambiarPantalla = function () {
        if (this.verPantalla) {
            this.verPantalla = false;
        }
        else {
            this.verPantalla = true;
        }
    };
    PagesComponent.prototype.respuestas = function (event) {
        var _a, _b;
        this.respuestaPrueba.push(event);
        this.numeroPrueba += 1;
        this.cambiarPantalla();
        var ensayo = (_b = (_a = this.dataGeneral) === null || _a === void 0 ? void 0 : _a.ensayo) !== null && _b !== void 0 ? _b : {};
        if (this.datosEnsayos.data.length === this.respuestaPrueba.length) {
            ensayo[this.dataTipoEnsayo] = this.respuestaPrueba;
            this.dataGeneral.ensayo = ensayo;
            this.respuestasGeneral.emit(this.dataGeneral);
        }
    };
    PagesComponent.prototype.datosAleatorios = function () {
        var parcial = this.datosEnsayos.data;
        var guardar = [];
        var _loop_1 = function (i) {
            var posicion = Math.floor(Math.random() * parcial.length);
            guardar.push(parcial[posicion]);
            parcial = parcial.filter(function (prueba) { return prueba != parcial[posicion]; });
        };
        for (var i = 0; i < this.datosEnsayos.data.length; i++) {
            _loop_1(i);
        }
        this.datosEnsayos.data = guardar;
    };
    __decorate([
        core_1.Input()
    ], PagesComponent.prototype, "tipoEnsayo");
    __decorate([
        core_1.Input()
    ], PagesComponent.prototype, "dataGeneral");
    __decorate([
        core_1.Input()
    ], PagesComponent.prototype, "dataEnsayo");
    __decorate([
        core_1.Output()
    ], PagesComponent.prototype, "respuestasGeneral");
    PagesComponent = __decorate([
        core_1.Component({
            selector: "app-pages",
            templateUrl: "./pages.component.html",
            styleUrls: ["./pages.component.css"]
        })
    ], PagesComponent);
    return PagesComponent;
}());
exports.PagesComponent = PagesComponent;
