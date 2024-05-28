import { Controller, Get, Query } from '@nestjs/common';
import { RoomService } from './room.service';

@Controller('rooms')
export class RoomController {
    constructor(private readonly roomService: RoomService) { }

    @Get()
    async findAll(
        @Query('page') page: number,
        @Query('limit') limit: number,
        @Query('filters') filters: string,
        @Query('sort') sort: string,
    ) {
        const parsedFilters = filters ? JSON.parse(filters) : [];
        const parsedSort = sort ? JSON.parse(sort) : [];
        const options = {
            page: page || 0,
            limit: limit || 10,
            filters: parsedFilters,
            sort: parsedSort,
        };
        return this.roomService.findAll(options);
    }
}
