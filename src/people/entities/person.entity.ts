import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Email } from "./email.entity";
import { Phone } from "./phone.entity";
import { Address } from "./address.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Person {
    @ApiProperty({ description: "Unique identifier of the person" })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ description: "First name of the person" })
    @Column()
    firstName: string;

    @ApiProperty({ description: "Last name of the person" })
    @Column()
    lastName: string;

    @ApiProperty({ description: "Soft delete flag", default: false })
    @Column({ default: false })
    isDeleted: boolean;

    @ApiProperty({
        type: () => [Email],
        description: "List of email addresses",
    })
    @OneToMany(() => Email, (email) => email.person, { cascade: true })
    emails: Email[];

    @ApiProperty({ type: () => [Phone], description: "List of phone numbers" })
    @OneToMany(() => Phone, (phone) => phone.person, { cascade: true })
    phones: Phone[];

    @ApiProperty({ type: () => [Address], description: "List of addresses" })
    @OneToMany(() => Address, (address) => address.person, { cascade: true })
    addresses: Address[];
}
