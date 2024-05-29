import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `Hi, welcome to the typeorm-nest test at : ${Date()}`;
  }
}
