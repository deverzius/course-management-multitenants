import { BadRequestException, Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';

import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { ReturnTenantDto } from './dto/return-tenant.dto';
import { Tenant } from './entities/tenant.entity';
import { LoginInfo } from '../auth/dto';

@Injectable()
export class TenantsService {
  constructor(
    @InjectRepository(Tenant)
    private readonly tenantsRepository: Repository<Tenant>,
    private readonly jwtService: JwtService,
  ) {}

  // async create(createTenantDto: CreateTenantDto): Promise<Tenant> {
  //   const tenant = new Tenant(createTenantDto);

  //   const result: Tenant = await this.tenantsRepository
  //     .save(tenant)
  //     .catch(() => {
  //       throw new BadRequestException(
  //         'Not enough data to create a tenant or Tenant already exists!!',
  //       );
  //     });

  //   const schemaName = `tenant_${result.id}`;
  //   await this.tenantsRepository.query(
  //     `CREATE SCHEMA IF NOT EXISTS "${schemaName}"`,
  //   );

  //   return result;
  // }
}
