import { Module } from '@nestjs/common';
import { UrlService } from './url.service';
import { UrlController } from './url.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Url } from './entities/url.entity';
import { MongoEntityRepository } from '@mikro-orm/mongodb';

@Module({
  imports: [MikroOrmModule.forFeature([Url])],
  controllers: [UrlController],
  providers: [UrlService, MongoEntityRepository],
})
export class UrlModule {}
