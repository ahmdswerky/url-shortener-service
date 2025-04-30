import { EntityManager } from '@mikro-orm/mongodb';
import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(
    protected configService: ConfigService,
    protected em: EntityManager,
  ) {}

  @Get('health')
  async health() {
    await this.em.getConnection().connect();
    const connected = await this.em.getConnection().isConnected();

    return {
      db: this.configService.get('MONGODB_URL'),
      connected,
      status: 'ok',
    };
  }
}
