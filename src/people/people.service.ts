import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, In } from "typeorm";
import { Person } from "./entities/person.entity";
import { CreatePersonDto } from "./dto/create-person.dto";
import { UpdatePersonDto } from "./dto/update-person.dto";

@Injectable()
export class PeopleService {
    constructor(
        @InjectRepository(Person)
        private readonly personRepository: Repository<Person>
    ) {}

    // Create a new person
    async create(createPersonDto: CreatePersonDto) {
        try {
            const person = this.personRepository.create(createPersonDto);
            return await this.personRepository.save(person);
        } catch (error) {
            throw new Error(`Failed to create person: ${error.message}`);
        }
    }

    // Retrieve all people, optionally filtered by a search term
    async findAll(search?: string) {
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
                query.where(
                    "person.firstName LIKE :search OR person.lastName LIKE :search OR emails.email LIKE :search",
                    { search: `%${search}%` }
                );
            }

            return await query.getMany();
        } catch (error) {
            throw new Error(`Failed to fetch people: ${error.message}`);
        }
    }

    // Retrieve a single person by ID
    async findOne(id: number) {
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

            if (!person) throw new NotFoundException("Person not found");
            return person;
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new Error(`Failed to find person: ${error.message}`);
        }
    }

    // Update an existing person
    async update(id: number, updatePersonDto: UpdatePersonDto) {
        try {
            // First, find the existing person
            const existingPerson = await this.personRepository.findOne({
                where: { id },
                relations: ["emails", "phones", "addresses"],
            });

            if (!existingPerson) {
                throw new NotFoundException("Person not found");
            }

            // Update the basic properties
            existingPerson.firstName =
                updatePersonDto.firstName ?? existingPerson.firstName;
            existingPerson.lastName =
                updatePersonDto.lastName ?? existingPerson.lastName;

            // Clear existing relations if new ones are provided
            if (updatePersonDto.emails) {
                existingPerson.emails = [];
            }
            if (updatePersonDto.phones) {
                existingPerson.phones = [];
            }
            if (updatePersonDto.addresses) {
                existingPerson.addresses = [];
            }

            // Merge the updated data
            const updatedPerson = this.personRepository.merge(
                existingPerson,
                updatePersonDto
            );

            // Save the updated person with all its relations
            const savedPerson = await this.personRepository.save(updatedPerson);

            return this.findOne(savedPerson.id);
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new Error(`Failed to update person: ${error.message}`);
        }
    }

    // Soft delete a person by id
    async remove(id: number) {
        try {
            const result = await this.personRepository.update(id, {
                isDeleted: true,
            });
            if (result.affected === 0)
                throw new NotFoundException("Person not found");
            return { message: "Person soft deleted successfully" };
        } catch (error) {
            if (error instanceof NotFoundException) throw error;
            throw new Error(`Failed to delete person: ${error.message}`);
        }
    }

    // Bulk soft delete or restore multiple people by their IDs
    async bulkDelete(ids: number[], restore = false) {
        try {
            if (!ids || !Array.isArray(ids) || ids.length === 0) {
                throw new Error("Invalid or empty array of IDs provided");
            }

            await this.personRepository
                .createQueryBuilder()
                .update(Person)
                .set({ isDeleted: !restore })
                .where("id IN (:...ids)", { ids })
                .execute();

            return {
                message: restore
                    ? "People restored successfully"
                    : "People soft deleted successfully",
            };
        } catch (error) {
            throw new Error(
                `Failed to ${restore ? "restore" : "delete"} people: ${
                    error.message
                }`
            );
        }
    }
}
