import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PeopleController } from "./people.controller";
import { PeopleService } from "./people.service";
import { Person } from "./entities/person.entity";
import { Email } from "./entities/email.entity";
import { Phone } from "./entities/phone.entity";
import { Address } from "./entities/address.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Person, Email, Phone, Address])],
    controllers: [PeopleController],
    providers: [PeopleService],
})
export class PeopleModule {}
