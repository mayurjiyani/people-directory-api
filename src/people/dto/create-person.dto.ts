import { IsString, IsArray, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { Email } from "../entities/email.entity";
import { Phone } from "../entities/phone.entity";
import { Address } from "../entities/address.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreatePersonDto {
    @ApiProperty({ description: "The first name of the person" })
    @IsString()
    firstName: string;

    @ApiProperty({ description: "The last name of the person" })
    @IsString()
    lastName: string;

    @ApiProperty({
        type: [Email],
        description: "List of email addresses associated with the person",
    })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => Email)
    emails: Partial<Email>[];

    @ApiProperty({
        type: [Phone],
        description: "List of phone numbers associated with the person",
    })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => Phone)
    phones: Partial<Phone>[];

    @ApiProperty({
        type: [Address],
        description: "List of addresses associated with the person",
    })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => Address)
    addresses: Partial<Address>[];
}
