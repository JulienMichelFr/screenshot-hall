import { Module } from '@nestjs/common';
import { ConfigModule } from '@database01/nest-config';
import { AppConfig } from '../configuration/app.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot<AppConfig>(AppConfig, { isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [AppConfig],
      useFactory: ({ database }: AppConfig) => {
        return {
          ...database,
          type: 'postgres',
          entities: [__dirname + '/**/*.entity.{js,ts}'],
          autoLoadEntities: true,
        };
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
