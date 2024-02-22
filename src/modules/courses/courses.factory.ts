import { Injectable, Inject, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { TENANT_HEADER } from 'src/constants';
import { DataSource } from 'typeorm';
import { Course } from './entities/course.entity';

@Injectable({ scope: Scope.REQUEST })
export class CourseDataSourceFactory {
  constructor(@Inject(REQUEST) private request: Request) {}

	create(): Promise<DataSource> {
		const tenantId = this.request?.headers?.[TENANT_HEADER] as string;
    const schemaName = `tenant_${tenantId}`;

    const dataSource = new DataSource({
      name: 'courses',
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      schema: schemaName,
      migrationsRun: true,
      synchronize: true,
      logging: true,
      entities: [Course],
    });

    return dataSource.initialize();
  }
}
