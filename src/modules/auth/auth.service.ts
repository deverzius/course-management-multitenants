import { BadRequestException, Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Tenant } from '../tenants/entities/tenant.entity';
import { User } from '../users/entities/user.entity';

import { LoginInfo } from './dto';
import { ReturnTenantDto } from '../tenants/dto/return-tenant.dto';
import { ReturnUserDto } from '../users/dto/return-user.dto';
import { CreateTenantDto } from '../tenants/dto/create-tenant.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';

import { AuthUtils } from '../../utils/auth.utils';
import { ROLE } from 'src/constants';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Tenant)
		private readonly tenantsRepository: Repository<Tenant>,
		@InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async loginForTenant(loginInfo: LoginInfo): Promise<ReturnTenantDto> {
    const { username, password } = loginInfo;
    const tenant = await this.tenantsRepository.findOneBy({ username });
    if (!tenant) {
      throw new BadRequestException('Tenant not found');
    }
    if (await AuthUtils.getInstance().comparePassword(password, tenant.password) === false){
      throw new BadRequestException('Invalid password');
    }

    const signResult = AuthUtils.getInstance().signPayload({
      id: tenant.id,
      username: tenant.username,
      role: ROLE.TENANT,
    });

    return ReturnTenantDto.fromTenant(
      tenant,
      signResult.accessToken,
      signResult.refreshToken,
    );
  }

  async createTenant(createTenantDto: CreateTenantDto): Promise<Tenant> {
    const tenant = new Tenant(createTenantDto);
    tenant.password = await AuthUtils.getInstance().hashPassword(tenant.password);

    const result: Tenant = await this.tenantsRepository
      .save(tenant)
      .catch(() => {
        throw new BadRequestException(
          'Not enough data to create a tenant or Tenant already exists!!',
        );
      });

    const schemaName = `tenant_${result.id}`;
    await this.tenantsRepository.query(
      `CREATE SCHEMA IF NOT EXISTS "${schemaName}"`,
    );

    return result;
  }

  async loginForUser(loginInfo: LoginInfo): Promise<ReturnUserDto> {
    const { username, password, role: userRole } = loginInfo;
    const user = await this.usersRepository.findOneBy({ username });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    if (await AuthUtils.getInstance().comparePassword(password, user.password) === false) {
      throw new BadRequestException('Invalid password');
    }

    const signResult = AuthUtils.getInstance().signPayload({
      id: user.id,
      username: user.username,
      role: userRole,
    });

    return ReturnUserDto.fromUser(
      user,
      signResult.accessToken,
      signResult.refreshToken,
		);
	}
	
	async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = new User(createUserDto);
    user.password = await AuthUtils.getInstance().hashPassword(user.password);

    const result = await this.usersRepository
      .save(user)
      .catch(() => {
        throw new BadRequestException(
          'Not enough data to create a user or User already exists!!',
        );
      });

    return result;
  }
}
