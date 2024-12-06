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
exports.PeopleController = void 0;
const common_1 = require("@nestjs/common");
const people_service_1 = require("./people.service");
const create_person_dto_1 = require("./dto/create-person.dto");
const update_person_dto_1 = require("./dto/update-person.dto");
const swagger_1 = require("@nestjs/swagger");
let PeopleController = exports.PeopleController = class PeopleController {
    constructor(peopleService) {
        this.peopleService = peopleService;
    }
    create(createPersonDto) {
        return this.peopleService.create(createPersonDto);
    }
    findAll(search) {
        return this.peopleService.findAll(search);
    }
    findOne(id) {
        return this.peopleService.findOne(id);
    }
    update(id, updatePersonDto) {
        return this.peopleService.update(id, updatePersonDto);
    }
    bulkDelete(ids, restore) {
        return this.peopleService.bulkDelete(ids, restore);
    }
    remove(id) {
        return this.peopleService.remove(id);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Create a new person" }),
    (0, swagger_1.ApiResponse)({ status: 201, description: "Person successfully created" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Bad request" }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_person_dto_1.CreatePersonDto]),
    __metadata("design:returntype", void 0)
], PeopleController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Get all people" }),
    (0, swagger_1.ApiQuery)({
        name: "search",
        required: false,
        description: "Search term for filtering people",
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "List of people retrieved successfully",
    }),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)("search")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PeopleController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Get a person by ID" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "Person ID" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Person found" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Person not found" }),
    (0, common_1.Get)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PeopleController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Update a person" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "Person ID" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Person updated successfully" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Person not found" }),
    (0, common_1.Put)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_person_dto_1.UpdatePersonDto]),
    __metadata("design:returntype", void 0)
], PeopleController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Bulk delete or restore people" }),
    (0, swagger_1.ApiQuery)({
        name: "restore",
        required: false,
        description: "Whether to restore instead of delete",
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: "Operation completed successfully",
    }),
    (0, common_1.Delete)("/bulk-delete"),
    __param(0, (0, common_1.Body)("ids")),
    __param(1, (0, common_1.Query)("restore")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Boolean]),
    __metadata("design:returntype", void 0)
], PeopleController.prototype, "bulkDelete", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "Soft delete a person" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "Person ID" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Person deleted successfully" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Person not found" }),
    (0, common_1.Delete)(":id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PeopleController.prototype, "remove", null);
exports.PeopleController = PeopleController = __decorate([
    (0, swagger_1.ApiTags)("People"),
    (0, common_1.Controller)("people"),
    __metadata("design:paramtypes", [people_service_1.PeopleService])
], PeopleController);
//# sourceMappingURL=people.controller.js.map