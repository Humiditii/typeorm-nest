import { Controller, Get, Query, Res } from '@nestjs/common';
import { RoomService } from './room.service';
import { Response } from 'express';

@Controller('rooms')
export class RoomController {
    constructor(private readonly roomService: RoomService) { }

    @Get()
    async findAll(
        @Query('page') page: number,
        @Query('limit') limit: number,
        @Query('filters') filters: string,
        @Query('sort') sort: string,
        @Res() res: Response
    ) {
        const parsedFilters = filters ? JSON.parse(filters) : [];
        const parsedSort = sort ? JSON.parse(sort) : [];
        const options = {
            page: page || 0,
            limit: limit || 10,
            filters: parsedFilters,
            sort: parsedSort,
        };
        const data =  await this.roomService.findAll(options);

        return res.status(200).json(data)
    }

    @Get('insert')
    async insert(
        @Res() res:Response
    ){
        await this.roomService.insertRooms()

        return res.status(200).json({
            message:"Done"
        })
    }
}
