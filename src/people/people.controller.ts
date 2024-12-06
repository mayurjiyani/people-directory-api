import {
    Controller,
    Get,
    Post,
    Body,
    Delete,
    Param,
    Patch,
    Query,
    Put,
} from "@nestjs/common";
import { PeopleService } from "./people.service";
import { CreatePersonDto } from "./dto/create-person.dto";
import { UpdatePersonDto } from "./dto/update-person.dto";
import {
    ApiTags,
    ApiOperation,
    ApiResponse,
    ApiQuery,
    ApiParam,
} from "@nestjs/swagger";

@ApiTags("People")
@Controller("people")
export class PeopleController {
    constructor(private readonly peopleService: PeopleService) {}

    @ApiOperation({ summary: "Create a new person" })
    @ApiResponse({ status: 201, description: "Person successfully created" })
    @ApiResponse({ status: 400, description: "Bad request" })
    @Post()
    create(@Body() createPersonDto: CreatePersonDto) {
        return this.peopleService.create(createPersonDto);
    }

    @ApiOperation({ summary: "Get all people" })
    @ApiQuery({
        name: "search",
        required: false,
        description: "Search term for filtering people",
    })
    @ApiResponse({
        status: 200,
        description: "List of people retrieved successfully",
    })
    @Get()
    findAll(@Query("search") search?: string) {
        return this.peopleService.findAll(search);
    }

    @ApiOperation({ summary: "Get a person by ID" })
    @ApiParam({ name: "id", description: "Person ID" })
    @ApiResponse({ status: 200, description: "Person found" })
    @ApiResponse({ status: 404, description: "Person not found" })
    @Get(":id")
    findOne(@Param("id") id: number) {
        return this.peopleService.findOne(id);
    }

    @ApiOperation({ summary: "Update a person" })
    @ApiParam({ name: "id", description: "Person ID" })
    @ApiResponse({ status: 200, description: "Person updated successfully" })
    @ApiResponse({ status: 404, description: "Person not found" })
    @Put(":id")
    update(@Param("id") id: number, @Body() updatePersonDto: UpdatePersonDto) {
        return this.peopleService.update(id, updatePersonDto);
    }

    @ApiOperation({ summary: "Bulk delete or restore people" })
    @ApiQuery({
        name: "restore",
        required: false,
        description: "Whether to restore instead of delete",
    })
    @ApiResponse({
        status: 200,
        description: "Operation completed successfully",
    })
    @Delete("/bulk-delete")
    bulkDelete(
        @Body("ids") ids: number[],
        @Query("restore") restore?: boolean
    ) {
        return this.peopleService.bulkDelete(ids, restore);
    }

    @ApiOperation({ summary: "Soft delete a person" })
    @ApiParam({ name: "id", description: "Person ID" })
    @ApiResponse({ status: 200, description: "Person deleted successfully" })
    @ApiResponse({ status: 404, description: "Person not found" })
    @Delete(":id")
    remove(@Param("id") id: number) {
        return this.peopleService.remove(id);
    }
}
