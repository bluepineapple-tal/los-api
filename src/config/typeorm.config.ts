import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    if (process.env.NODE_ENV === 'development') {
      // return {
      //   type: this.configService.get<any>('DB_TYPE'),
      //   synchronize: JSON.parse(this.configService.get<string>('SYNCHRONIZE')),
      //   host: this.configService.get<string>('DB_HOST'),
      //   database: this.configService.get<string>('DB_NAME'),
      //   password: this.configService.get<string>('DB_PASS'),
      //   port: this.configService.get<number>('DB_PORT'),
      //   autoLoadEntities: true,
      // };
      return {
        type: this.configService.get<any>('DB_TYPE'),
        synchronize: JSON.parse(this.configService.get<string>('SYNCHRONIZE')),
        database: this.configService.get<string>('DB_NAME'),
        autoLoadEntities: true,
      };
    } else if (process.env.NODE_ENV === 'test') {
      return {
        type: this.configService.get<any>('DB_TYPE'),
        synchronize: JSON.parse(this.configService.get<string>('SYNCHRONIZE')),
        database: this.configService.get<string>('DB_NAME'),
        password: this.configService.get<string>('DB_PASS'),
        autoLoadEntities: true,
        migrationsRun: JSON.parse(
          this.configService.get<string>('MIGRATIONS_RUN'),
        ),
      };
    } else if (process.env.NODE_ENV === 'production') {
      return {
        type: this.configService.get<any>('DB_TYPE'),
        synchronize: false,
        url: process.env.DATABASE_URL,
        autoLoadEntities: true,
        migrationsRun: JSON.parse(
          this.configService.get<string>('MIGRATIONS_RUN'),
        ),
        ssl: {
          rejectUnauthorized: JSON.parse(this.configService.get<string>('SSL')),
        },
      };
    }
  }
}
