import { Module } from '@nestjs/common';
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

@Module({
  imports: [
    GalleryModule,
    AuthModule,
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
    ScreenshotModule,
    DataModule,
    IgdbModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
