import { Module } from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { TenantsController } from './tenants.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tenant } from './entities/tenant.entity';
import { configOrm } from 'src/config';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(configOrm()),
    TypeOrmModule.forFeature([Tenant]),
  ],
  controllers: [TenantsController],
  providers: [TenantsService, JwtService],
})
export class TenantsModule {}
