import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@database01/nest-config';
import { AppConfig } from '../configuration/app.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { GalleryModule } from './modules/gallery/gallery.module';
import { GalleryEntity } from './modules/database/entities/gallery.entity';
import { UserEntity } from './modules/database/entities/user.entity';
import { ScreenshotModule } from './modules/screenshot/screenshot.module';
import { ScreenshotEntity } from './modules/database/entities/screenshot.entity';
import { DataModule } from './modules/data/data.module';
import { IgdbModule } from './modules/igdb/igdb.module';
import { LoggerModule } from './modules/logger/logger.module';
import { RequestLoggerMiddleware } from './middlewares/request-logger/request-logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot<AppConfig>(AppConfig, { isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [AppConfig],
      useFactory: ({ database }: AppConfig) => {
        return {
          ...database,
          type: 'postgres',
          entities: [UserEntity, GalleryEntity, ScreenshotEntity],
          autoLoadEntities: true,
        };
      },
    }),
    LoggerModule,
    GalleryModule,
    AuthModule,
    ScreenshotModule,
    DataModule,
    IgdbModule,
  ],
  controllers: [],
  providers: [RequestLoggerMiddleware],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
