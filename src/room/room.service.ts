import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeormHelperService } from 'src/TypeormHelper/typeormHelper.service';
import { RoomRepository } from './dbLayer/room.repository';

@Injectable()
export class RoomService {
    constructor(
        @InjectRepository(RoomRepository)
        private readonly roomRepository: RoomRepository,
        private readonly typeormHelperService: TypeormHelperService
    ) { }

    async findAll(options: any): Promise<any> {
        const query = this.roomRepository.createQueryBuilder('room');

        this.typeormHelperService.applyPagination(query, { page: options.page, limit: options.limit });
        this.typeormHelperService.applyFilters(query, options.filters);
        this.typeormHelperService.applySorting(query, options.sort);

        const [items, total] = await query.getManyAndCount();
        return { items, total };
    }
}
