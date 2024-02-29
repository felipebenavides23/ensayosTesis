"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.AppComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var prubas_1 = require("./module/prubas");
var AppComponent = /** @class */ (function () {
    function AppComponent(formBuilder, config, modalService, api) {
        this.formBuilder = formBuilder;
        this.config = config;
        this.modalService = modalService;
        this.api = api;
        this.ETipoEnsayos = prubas_1.ETipoEnsayos;
        this.dataGeneral = {};
        this.title = "tesis";
        this.estado = false;
        this.estadoBotones = false;
        config.backdrop = "static";
        config.keyboard = false;
    }
    AppComponent.prototype.ngOnInit = function () {
        this.generarFormulario();
        this.validarPantalla();
    };
    AppComponent.prototype.verdatos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var respuesta, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.api.listarEnsayos()];
                    case 1:
                        respuesta = (_a.sent());
                        console.log(respuesta);
                        this.dataEnsayos = respuesta.ensayos;
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        console.error(error_1);
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AppComponent.prototype.open = function (content) {
        console.log(content);
        this.modalService.open(content);
    };
    AppComponent.prototype.validarPantalla = function () {
        var anchoPantalla = window.innerWidth;
        if (anchoPantalla < 750) {
            this.posicionPopover = "top";
        }
        else {
            this.posicionPopover = "end";
        }
    };
    Object.defineProperty(AppComponent.prototype, "documento", {
        get: function () {
            return this.documentoForm.get("documento");
        },
        enumerable: false,
        configurable: true
    });
    AppComponent.prototype.generarFormulario = function () {
        this.documentoForm = this.formBuilder.group({
            documento: [
                "",
                [
                    forms_1.Validators.required,
                    forms_1.Validators.pattern("^[0-9]*$"),
                    forms_1.Validators.minLength(6),
                ],
            ]
        });
    };
    AppComponent.prototype.verificar = function (content) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.documentoForm.valid) return [3 /*break*/, 4];
                        _a = this;
                        return [4 /*yield*/, this.api.validarDocumento(this.documento.value)];
                    case 1:
                        _a.documentoValidar = (_b.sent());
                        if (!this.documentoValidar.existe) return [3 /*break*/, 2];
                        this.open(this.modal1);
                        return [3 /*break*/, 4];
                    case 2:
                        this.open(this.modal1);
                        this.estadoBotones = true;
                        this.dataGeneral.documento = this.documento.value;
                        return [4 /*yield*/, this.verdatos()];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AppComponent.prototype.tipoEnsayo = function (tipo) {
        this.tipo = tipo;
        this.estado = true;
    };
    AppComponent.prototype.reset = function () {
        this.estado = false;
    };
    AppComponent.prototype.validarData = function (evento) {
        return __awaiter(this, void 0, void 0, function () {
            var respuesta, error_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.dataGeneral = evento;
                        this.estado = false;
                        this.estadoBotones = true;
                        if (!(this.dataGeneral.ensayo.verificacion &&
                            !this.dataGeneral.ensayo.entrenamiento)) return [3 /*break*/, 1];
                        setTimeout(function () {
                            _this.simularClickEntre();
                        }, 100);
                        return [3 /*break*/, 6];
                    case 1:
                        if (!(!this.dataGeneral.ensayo.experimentales &&
                            this.dataGeneral.ensayo.entrenamiento)) return [3 /*break*/, 2];
                        setTimeout(function () {
                            _this.simularClickExpe();
                        }, 100);
                        return [3 /*break*/, 6];
                    case 2:
                        if (!this.dataGeneral.ensayo.experimentales) return [3 /*break*/, 6];
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, this.api.guaradaRespuestas(this.dataGeneral)];
                    case 4:
                        respuesta = _a.sent();
                        this.estadoBotones = false;
                        setTimeout(function () {
                            _this.open(_this.modal1);
                        }, 100);
                        this.documentoForm.reset();
                        return [3 /*break*/, 6];
                    case 5:
                        error_2 = _a.sent();
                        console.error(error_2);
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    AppComponent.prototype.simularClick = function () {
        if (this.miBoton) {
            this.miBoton.nativeElement.click();
        }
        else {
            console.error("No se pudo encontrar el botón");
        }
    };
    AppComponent.prototype.simularClickEntre = function () {
        if (this.BotonEntrenamiento) {
            this.BotonEntrenamiento.nativeElement.click();
        }
        else {
            console.error("No se pudo encontrar el botón");
        }
    };
    AppComponent.prototype.simularClickExpe = function () {
        if (this.BotonExperimento) {
            this.BotonExperimento.nativeElement.click();
        }
        else {
            console.error("No se pudo encontrar el botón");
        }
    };
    __decorate([
        core_1.ViewChild("miBoton", { static: false })
    ], AppComponent.prototype, "miBoton");
    __decorate([
        core_1.ViewChild("BotonEntrenamiento", { static: false })
    ], AppComponent.prototype, "BotonEntrenamiento");
    __decorate([
        core_1.ViewChild("BotonExperimento", { static: false })
    ], AppComponent.prototype, "BotonExperimento");
    __decorate([
        core_1.ViewChild("content", { static: false })
    ], AppComponent.prototype, "modal1");
    AppComponent = __decorate([
        core_1.Component({
            selector: "app-root",
            templateUrl: "./app.component.html",
            styleUrls: ["./app.component.css"]
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
