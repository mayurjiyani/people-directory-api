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
exports.Email = void 0;
const typeorm_1 = require("typeorm");
const person_entity_1 = require("./person.entity");
const swagger_1 = require("@nestjs/swagger");
let Email = exports.Email = class Email {
};
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Unique identifier of the email" }),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Email.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Email address" }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Email.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => person_entity_1.Person, description: "Associated person" }),
    (0, typeorm_1.ManyToOne)(() => person_entity_1.Person, (person) => person.emails, { onDelete: "CASCADE" }),
    __metadata("design:type", person_entity_1.Person)
], Email.prototype, "person", void 0);
exports.Email = Email = __decorate([
    (0, typeorm_1.Entity)()
], Email);
//# sourceMappingURL=email.entity.js.map