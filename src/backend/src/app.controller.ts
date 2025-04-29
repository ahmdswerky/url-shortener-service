import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(protected configService: ConfigService) {}

  @Get('health')
  health() {
    return {
      db: this.configService.get('MONGODB_URL'),
      status: 'ok',
    };
  }
}
