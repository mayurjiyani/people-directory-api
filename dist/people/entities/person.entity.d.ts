import { Email } from "./email.entity";
import { Phone } from "./phone.entity";
import { Address } from "./address.entity";
export declare class Person {
    id: number;
    firstName: string;
    lastName: string;
    isDeleted: boolean;
    emails: Email[];
    phones: Phone[];
    addresses: Address[];
}
