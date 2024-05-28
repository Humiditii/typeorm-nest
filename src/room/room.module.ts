import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { RoomRepository } from './dbLayer/room.repository';
import TypeormHelperModule from 'src/TypeormHelper/typeormHelper.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([RoomRepository]),
        TypeormHelperModule
    ],
    providers: [RoomService],
    controllers: [RoomController],
})
export class RoomModule { }
