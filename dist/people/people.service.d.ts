import { Repository } from "typeorm";
import { Person } from "./entities/person.entity";
import { CreatePersonDto } from "./dto/create-person.dto";
import { UpdatePersonDto } from "./dto/update-person.dto";
export declare class PeopleService {
    private readonly personRepository;
    constructor(personRepository: Repository<Person>);
    create(createPersonDto: CreatePersonDto): Promise<Person>;
    findAll(search?: string): Promise<Person[]>;
    findOne(id: number): Promise<Person>;
    update(id: number, updatePersonDto: UpdatePersonDto): Promise<Person>;
    remove(id: number): Promise<{
        message: string;
    }>;
    bulkDelete(ids: number[], restore?: boolean): Promise<{
        message: string;
    }>;
}
