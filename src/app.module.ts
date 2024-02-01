import { Module } from '@nestjs/common/decorators';
import { TenantsModule } from './modules/tenants/tenants.module';
import { CoursesModule } from './modules/courses/courses.module';
import { NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configOrm } from './config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(configOrm()),
    TenantsModule,
    CoursesModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule implements NestModule {
  public configure(consumer: MiddlewareConsumer): void {
    // consumer.apply(() => {}).forRoutes('*');
  }
}
