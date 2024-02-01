import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configOrm } from 'src/config';
import { Tenant } from '../tenants/entities/tenant.entity';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(configOrm()),
    TypeOrmModule.forFeature([Tenant, User]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService],
})
export class AuthModule {}
