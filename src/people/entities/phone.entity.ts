import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Person } from "./person.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Phone {
    @ApiProperty({ description: "Unique identifier of the phone number" })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ description: "Phone number" })
    @Column()
    phoneNumber: string;

    @ApiProperty({
        description: "Type of phone number (home, work, mobile)",
        nullable: true,
    })
    @Column({ nullable: true })
    type: string;

    @ApiProperty({ type: () => Person, description: "Associated person" })
    @ManyToOne(() => Person, (person) => person.phones, { onDelete: "CASCADE" })
    person: Person;
}
