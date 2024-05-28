import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './room/dbLayer/room.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 3306,
      username: process.env.DB_USER,
      password: process.env.PASSWORD,
      database: process.env.DB_INUSE,
      entities: [Room],
      synchronize: true,
    }),
  ],
})
export class AppModule { }