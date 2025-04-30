import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Request,
  Ip,
  NotFoundException,
} from '@nestjs/common';
import { UrlService } from './url.service';
import { CreateUrlDto } from './dto/create-url.dto';

@Controller('urls')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post()
  create(@Ip() ip: string, @Body() createUrlDto: CreateUrlDto) {
    return this.urlService.create({
      targetURL: createUrlDto.targetURL,
      ip,
    });
  }

  @Get(':hashedID')
  async findOne(@Param('hashedID') hashedID: string) {
    const url = await this.urlService.findOneByHashedID(hashedID);

    if (!url) {
      throw new NotFoundException('URL not found');
    }

    return {
      url: url.targetURL,
    };
  }
}
