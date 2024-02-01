import { Tenant } from '../entities/tenant.entity';

export class ReturnTenantDto {
  static fromTenant(tenant: Tenant, accessToken: string, refreshToken: string) {
    const returnTenantDto = new ReturnTenantDto();
    const { id, password, ...temp } = tenant;

    Object.assign(returnTenantDto, temp);
    returnTenantDto.accessToken = accessToken;
    returnTenantDto.refreshToken = refreshToken;

    return returnTenantDto;
  }

  username: string;
  name: string;
  description: string;
  accessToken: string;
  refreshToken: string;
}
