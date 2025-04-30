import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { MongoDriver } from '@mikro-orm/mongodb';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { UrlModule } from './url/url.module';

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
        logger(message) {
          console.log(`[DB] ${message}`);
        },
        // user: 'admin',
        // password: 'admin',
        // host: 'mongodb',
        clientUrl: 'mongodb://admin:admin@mongo:27017/admin',
        // dbName: 'url_shortener',
        // clientUrl: configService.getOrThrow('MONGODB_URL'),
      }),
      inject: [ConfigService],
      driver: MongoDriver,
    }),
    UserModule,
    UrlModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
