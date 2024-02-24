import { MiddlewareConsumer, Module, Scope } from '@nestjs/common';
import { NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { configOrm } from 'src/config';
import { Course } from './entities/course.entity';
import { DATA_SOURCE_TENANT } from 'src/constants';
import { CourseDataSourceFactory } from './courses.factory';
import { checkTenantId } from 'src/middlewares/check-tenant-id.middleware';
import { checkToken } from 'src/middlewares/check-token.middleware';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/guards/roles.guard';

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
    {
      provide: APP_GUARD,
      useClass: RolesGuard
    }
  ],
  controllers: [CoursesController],
})

export class CoursesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(checkTenantId, checkToken)
      .forRoutes('/courses');
  }
}
