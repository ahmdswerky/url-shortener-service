import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MongoDriver } from '@mikro-orm/mongodb';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MikroOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        driver: MongoDriver,
        autoLoadEntities: true,
        entities: ['./dist/**/entities'],
        entitiesTs: ['./src/**/entities'],
        clientUrl: configService.getOrThrow('MONGODB_URL'),
      }),
      inject: [ConfigService],
      driver: MongoDriver,
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
