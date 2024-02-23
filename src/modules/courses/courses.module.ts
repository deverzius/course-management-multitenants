import { MiddlewareConsumer, Module, Scope } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configOrm } from 'src/config';
import { Course } from './entities/course.entity';
import { DATA_SOURCE_TENANT } from 'src/constants';
import { DataSource } from 'typeorm';
import { CourseDataSourceFactory } from './courses.factory';
import { NestModule } from '@nestjs/common';
import { checkTenantId } from 'src/middlewares/check-tenant-id.middleware';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(configOrm()),
    TypeOrmModule.forFeature([Course]),
  ],
  providers: [
    CoursesService,
    CourseDataSourceFactory,
    {
      provide: DATA_SOURCE_TENANT,
      scope: Scope.REQUEST,
      useFactory: async (courseDataSourceFactory: CourseDataSourceFactory) => {
        return await courseDataSourceFactory.create();
      },
      inject: [CourseDataSourceFactory],
    },
  ],
  controllers: [CoursesController],
})

export class CoursesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(checkTenantId)
      .forRoutes('/courses');
  }
}
