import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Person } from "./person.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Email {
    @ApiProperty({ description: "Unique identifier of the email" })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ description: "Email address" })
    @Column()
    email: string;

    @ApiProperty({ type: () => Person, description: "Associated person" })
    @ManyToOne(() => Person, (person) => person.emails, { onDelete: "CASCADE" })
    person: Person;
}
