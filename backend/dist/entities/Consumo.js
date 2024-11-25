"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Consumo = void 0;
const typeorm_1 = require("typeorm");
const Unidade_1 = require("./Unidade");
let Consumo = class Consumo {
};
exports.Consumo = Consumo;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Consumo.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Consumo.prototype, "consumoForaPontaEmKWH", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Consumo.prototype, "mesDoConsumo", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Unidade_1.Unidade, unidade => unidade.historicoDeConsumoEmKWH),
    __metadata("design:type", Unidade_1.Unidade)
], Consumo.prototype, "unidade", void 0);
exports.Consumo = Consumo = __decorate([
    (0, typeorm_1.Entity)()
], Consumo);
