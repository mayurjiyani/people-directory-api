import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { Person } from "../people/entities/person.entity";
import { Email } from "src/people/entities/email.entity";
import { Phone } from "src/people/entities/phone.entity";
import { Address } from "src/people/entities/address.entity";

@Injectable()
export class DatabaseConfig implements TypeOrmOptionsFactory {
    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: "mysql",
            host: process.env.DB_HOST,
            port: +process.env.DB_PORT,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            entities: [Person, Email, Phone, Address],
            synchronize: true,
        };
    }
}
