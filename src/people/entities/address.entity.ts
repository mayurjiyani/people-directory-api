import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Person } from "./person.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Address {
    @ApiProperty({ description: "Unique identifier of the address" })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ description: "Street address" })
    @Column()
    street: string;

    @ApiProperty({ description: "City" })
    @Column()
    city: string;

    @ApiProperty({ description: "State or province" })
    @Column()
    state: string;

    @ApiProperty({ description: "Postal code" })
    @Column()
    postalCode: string;

    @ApiProperty({ description: "Country", nullable: true })
    @Column({ nullable: true })
    country: string;

    @ApiProperty({ type: () => Person, description: "Associated person" })
    @ManyToOne(() => Person, (person) => person.addresses, {
        onDelete: "CASCADE",
    })
    person: Person;
}
