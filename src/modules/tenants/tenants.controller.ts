import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { LoginInfo } from '../auth/dto';

@Controller('tenants')
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) {}

  // @Get()
  // getAll(@Body() createTenantDto: CreateTenantDto) {
  //   return this.tenantsService.findByUsername('')
  // }

  // @Post()
  // create(@Body() createTenantDto: CreateTenantDto) {
  //   return this.tenantsService.create(createTenantDto);
  // }
}
