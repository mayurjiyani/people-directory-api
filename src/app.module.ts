import { Module } from "@nestjs/common";
import { PeopleModule } from "./people/people.module";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DatabaseConfig } from "./config/database.config";
import { Person } from "./people/entities/person.entity";
import { Email } from "./people/entities/email.entity";
import { Phone } from "./people/entities/phone.entity";
import { Address } from "./people/entities/address.entity";

@Module({
    imports: [
        // ConfigModule setup
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        // TypeORM setup
        TypeOrmModule.forRootAsync({
            useClass: DatabaseConfig,
            imports: [
                TypeOrmModule.forFeature([Person, Email, Phone, Address]), // Registers entities for repository use
            ],
        }),
        PeopleModule,
    ],
})
export class AppModule {}
