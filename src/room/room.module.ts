import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import TypeormHelperModule from 'src/TypeormHelper/typeormHelper.module';
import { Room } from './dbLayer/room.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Room]),
        TypeormHelperModule
    ],
    providers: [RoomService],
    controllers: [RoomController],
})
export class RoomModule { }
