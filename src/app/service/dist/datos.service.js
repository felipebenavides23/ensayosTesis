"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DatosService = void 0;
var core_1 = require("@angular/core");
var DatosService = /** @class */ (function () {
    function DatosService(httpCliente) {
        this.httpCliente = httpCliente;
    }
    DatosService.prototype.listarEnsayos = function () {
        var url = "https://73g6i1sclj.execute-api.us-east-2.amazonaws.com/listar-ensayos";
        return this.httpCliente
            .get(url)
            .toPromise()
            .then(function (respuesta) {
            return respuesta;
        })["catch"](function (error) {
            console.log(error);
        });
    };
    DatosService.prototype.validarDocumento = function (documento) {
        var url = "https://73g6i1sclj.execute-api.us-east-2.amazonaws.com/ver-documento/" +
            documento;
        return this.httpCliente
            .get(url)
            .toPromise()
            .then(function (respuesta) {
            return respuesta;
        })["catch"](function (error) {
            console.log(error);
        });
    };
    DatosService.prototype.guaradaRespuestas = function (data) {
        var url = "https://73g6i1sclj.execute-api.us-east-2.amazonaws.com/guardar-registro";
        var pdata = JSON.stringify(data);
        return this.httpCliente
            .post(url, pdata)
            .toPromise()
            .then(function (respuesta) {
            return respuesta;
        })["catch"](function (error) {
            console.log(error);
        });
    };
    DatosService = __decorate([
        core_1.Injectable({
            providedIn: "root"
        })
    ], DatosService);
    return DatosService;
}());
exports.DatosService = DatosService;
