import { Email } from "../entities/email.entity";
import { Phone } from "../entities/phone.entity";
import { Address } from "../entities/address.entity";
export declare class CreatePersonDto {
    firstName: string;
    lastName: string;
    emails: Partial<Email>[];
    phones: Partial<Phone>[];
    addresses: Partial<Address>[];
}
