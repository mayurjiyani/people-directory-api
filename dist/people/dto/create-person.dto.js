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
exports.CreatePersonDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const email_entity_1 = require("../entities/email.entity");
const phone_entity_1 = require("../entities/phone.entity");
const address_entity_1 = require("../entities/address.entity");
const swagger_1 = require("@nestjs/swagger");
class CreatePersonDto {
}
exports.CreatePersonDto = CreatePersonDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: "The first name of the person" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePersonDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: "The last name of the person" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePersonDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [email_entity_1.Email],
        description: "List of email addresses associated with the person",
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => email_entity_1.Email),
    __metadata("design:type", Array)
], CreatePersonDto.prototype, "emails", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [phone_entity_1.Phone],
        description: "List of phone numbers associated with the person",
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => phone_entity_1.Phone),
    __metadata("design:type", Array)
], CreatePersonDto.prototype, "phones", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [address_entity_1.Address],
        description: "List of addresses associated with the person",
    }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => address_entity_1.Address),
    __metadata("design:type", Array)
], CreatePersonDto.prototype, "addresses", void 0);
//# sourceMappingURL=create-person.dto.js.map