"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PeopleService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const person_entity_1 = require("./entities/person.entity");
let PeopleService = exports.PeopleService = class PeopleService {
    constructor(personRepository) {
        this.personRepository = personRepository;
    }
    async create(createPersonDto) {
        try {
            const person = this.personRepository.create(createPersonDto);
            return await this.personRepository.save(person);
        }
        catch (error) {
            throw new Error(`Failed to create person: ${error.message}`);
        }
    }
    async findAll(search) {
        try {
            const query = this.personRepository
                .createQueryBuilder("person")
                .select([
                "person.id",
                "person.firstName",
                "person.lastName",
                "emails.id",
                "emails.email",
                "phones.id",
                "phones.phoneNumber",
                "phones.type",
                "addresses.id",
                "addresses.street",
                "addresses.city",
                "addresses.state",
                "addresses.postalCode",
                "addresses.country",
            ])
                .leftJoinAndSelect("person.emails", "emails")
                .leftJoinAndSelect("person.phones", "phones")
                .leftJoinAndSelect("person.addresses", "addresses")
                .where("person.isDeleted = :isDeleted", { isDeleted: false });
            if (search) {
                query.where("person.firstName LIKE :search OR person.lastName LIKE :search OR emails.email LIKE :search", { search: `%${search}%` });
            }
            return await query.getMany();
        }
        catch (error) {
            throw new Error(`Failed to fetch people: ${error.message}`);
        }
    }
    async findOne(id) {
        try {
            const person = await this.personRepository
                .createQueryBuilder("person")
                .select([
                "person.id",
                "person.firstName",
                "person.lastName",
                "emails.id",
                "emails.email",
                "phones.id",
                "phones.phoneNumber",
                "phones.type",
                "addresses.id",
                "addresses.street",
                "addresses.city",
                "addresses.state",
                "addresses.postalCode",
                "addresses.country",
            ])
                .leftJoinAndSelect("person.emails", "emails")
                .leftJoinAndSelect("person.phones", "phones")
                .leftJoinAndSelect("person.addresses", "addresses")
                .where("person.id = :id AND person.isDeleted = :isDeleted", {
                id,
                isDeleted: false,
            })
                .getOne();
            if (!person)
                throw new common_1.NotFoundException("Person not found");
            return person;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException)
                throw error;
            throw new Error(`Failed to find person: ${error.message}`);
        }
    }
    async update(id, updatePersonDto) {
        try {
            const existingPerson = await this.personRepository.findOne({
                where: { id },
                relations: ["emails", "phones", "addresses"],
            });
            if (!existingPerson) {
                throw new common_1.NotFoundException("Person not found");
            }
            existingPerson.firstName =
                updatePersonDto.firstName ?? existingPerson.firstName;
            existingPerson.lastName =
                updatePersonDto.lastName ?? existingPerson.lastName;
            if (updatePersonDto.emails) {
                existingPerson.emails = [];
            }
            if (updatePersonDto.phones) {
                existingPerson.phones = [];
            }
            if (updatePersonDto.addresses) {
                existingPerson.addresses = [];
            }
            const updatedPerson = this.personRepository.merge(existingPerson, updatePersonDto);
            const savedPerson = await this.personRepository.save(updatedPerson);
            return this.findOne(savedPerson.id);
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException)
                throw error;
            throw new Error(`Failed to update person: ${error.message}`);
        }
    }
    async remove(id) {
        try {
            const result = await this.personRepository.update(id, {
                isDeleted: true,
            });
            if (result.affected === 0)
                throw new common_1.NotFoundException("Person not found");
            return { message: "Person soft deleted successfully" };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException)
                throw error;
            throw new Error(`Failed to delete person: ${error.message}`);
        }
    }
    async bulkDelete(ids, restore = false) {
        try {
            if (!ids || !Array.isArray(ids) || ids.length === 0) {
                throw new Error("Invalid or empty array of IDs provided");
            }
            await this.personRepository
                .createQueryBuilder()
                .update(person_entity_1.Person)
                .set({ isDeleted: !restore })
                .where("id IN (:...ids)", { ids })
                .execute();
            return {
                message: restore
                    ? "People restored successfully"
                    : "People soft deleted successfully",
            };
        }
        catch (error) {
            throw new Error(`Failed to ${restore ? "restore" : "delete"} people: ${error.message}`);
        }
    }
};
exports.PeopleService = PeopleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(person_entity_1.Person)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PeopleService);
//# sourceMappingURL=people.service.js.map