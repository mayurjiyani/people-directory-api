import { PeopleService } from "./people.service";
import { CreatePersonDto } from "./dto/create-person.dto";
import { UpdatePersonDto } from "./dto/update-person.dto";
export declare class PeopleController {
    private readonly peopleService;
    constructor(peopleService: PeopleService);
    create(createPersonDto: CreatePersonDto): Promise<import("./entities/person.entity").Person>;
    findAll(search?: string): Promise<import("./entities/person.entity").Person[]>;
    findOne(id: number): Promise<import("./entities/person.entity").Person>;
    update(id: number, updatePersonDto: UpdatePersonDto): Promise<import("./entities/person.entity").Person>;
    bulkDelete(ids: number[], restore?: boolean): Promise<{
        message: string;
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
