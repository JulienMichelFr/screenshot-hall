import { Module } from '@nestjs/common';
import { ConfigModule } from '@database01/nest-config';
import { AppConfig } from '../configuration/app.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { GalleryModule } from './modules/gallery/gallery.module';
import { join } from 'path';
import { GalleryEntity } from './modules/gallery/entities/gallery.entity';
import { UserEntity } from './modules/auth/entities/user.entity';

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
          entities: [UserEntity, GalleryEntity],
          autoLoadEntities: true,
        };
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
