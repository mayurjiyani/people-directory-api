import { Person } from "./person.entity";
export declare class Address {
    id: number;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    person: Person;
}
