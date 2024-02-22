import { join } from 'path';
import { env } from 'process';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { registerAs } from '@nestjs/config';

export const configOrm = registerAs(
  'typeorm',
  (): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    autoLoadEntities: true,
    synchronize: true,
    migrationsRun: true,
    logging: true,
    migrations: [join(__dirname, 'dist/migrations/*{.ts,.js}')],
    entities: [join(__dirname, 'dist/modules/**/*.entity{.ts,.js}')]
  }),
);
