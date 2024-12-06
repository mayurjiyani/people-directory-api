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
exports.Person = void 0;
const typeorm_1 = require("typeorm");
const email_entity_1 = require("./email.entity");
const phone_entity_1 = require("./phone.entity");
const address_entity_1 = require("./address.entity");
const swagger_1 = require("@nestjs/swagger");
let Person = exports.Person = class Person {
};
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Unique identifier of the person" }),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Person.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "First name of the person" }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Person.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Last name of the person" }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Person.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "Soft delete flag", default: false }),
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Person.prototype, "isDeleted", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: () => [email_entity_1.Email],
        description: "List of email addresses",
    }),
    (0, typeorm_1.OneToMany)(() => email_entity_1.Email, (email) => email.person, { cascade: true }),
    __metadata("design:type", Array)
], Person.prototype, "emails", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => [phone_entity_1.Phone], description: "List of phone numbers" }),
    (0, typeorm_1.OneToMany)(() => phone_entity_1.Phone, (phone) => phone.person, { cascade: true }),
    __metadata("design:type", Array)
], Person.prototype, "phones", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => [address_entity_1.Address], description: "List of addresses" }),
    (0, typeorm_1.OneToMany)(() => address_entity_1.Address, (address) => address.person, { cascade: true }),
    __metadata("design:type", Array)
], Person.prototype, "addresses", void 0);
exports.Person = Person = __decorate([
    (0, typeorm_1.Entity)()
], Person);
//# sourceMappingURL=person.entity.js.map