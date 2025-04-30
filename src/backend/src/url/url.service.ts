import { Injectable } from '@nestjs/common';
import { CreateUrlDto } from './dto/create-url.dto';
import {
  EntityManager,
  EntityRepository,
  MongoEntityRepository,
} from '@mikro-orm/mongodb';
import * as crypto from 'crypto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Url } from './entities/url.entity';

@Injectable()
export class UrlService {
  constructor(
    @InjectRepository(Url)
    protected readonly urlRepository: EntityRepository<Url>,
    private readonly entityManager: EntityManager,
  ) {}

  protected generateHashedID(url: string): string {
    const hash = crypto.createHash('sha256').update(url).digest('hex');

    const hashed = parseInt(hash.substring(0, 8), 16)
      .toString(36)
      .padStart(8, '0')
      .split('')
      .reverse()
      .join('')
      .substring(0, 6);
    const timestamp = Date.now()
      .toString()
      .split('')
      .reverse()
      .join('')
      .substring(0, 2);

    return [timestamp, hashed].join('');
  }

  public async create(createUrlDto: CreateUrlDto): Promise<Url> {
    const hashedID = this.generateHashedID(createUrlDto.targetURL);

    await this.entityManager.getDriver().connect();

    const created = await this.urlRepository.create({
      hashedID,
      targetURL: createUrlDto.targetURL,
      ip: createUrlDto.ip,
    });

    await this.entityManager.persistAndFlush(created);

    return created;
  }

  public async findOneByHashedID(hashedID: string): Promise<Url | null> {
    return this.urlRepository.findOneOrFail({
      hashedID,
    });
  }
}
