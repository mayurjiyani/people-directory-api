"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseConfig = void 0;
const common_1 = require("@nestjs/common");
const person_entity_1 = require("../people/entities/person.entity");
const email_entity_1 = require("../people/entities/email.entity");
const phone_entity_1 = require("../people/entities/phone.entity");
const address_entity_1 = require("../people/entities/address.entity");
let DatabaseConfig = exports.DatabaseConfig = class DatabaseConfig {
    createTypeOrmOptions() {
        return {
            type: "mysql",
            host: process.env.DB_HOST,
            port: +process.env.DB_PORT,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            entities: [person_entity_1.Person, email_entity_1.Email, phone_entity_1.Phone, address_entity_1.Address],
            synchronize: true,
        };
    }
};
exports.DatabaseConfig = DatabaseConfig = __decorate([
    (0, common_1.Injectable)()
], DatabaseConfig);
//# sourceMappingURL=database.config.js.map