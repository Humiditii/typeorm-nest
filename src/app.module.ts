import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './room/dbLayer/room.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoomModule } from './room/room.module';

@Module({
  controllers:[AppController],
  providers:[AppService],
  imports: [
    RoomModule,
    ConfigModule.forRoot({ isGlobal: true}),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get('DB_URL'),
        entities: [
          Room
        ],
        ssl: true,
        synchronize: true,
      }),
      inject: [ConfigService]
    })
  ],
})
export class AppModule { }


