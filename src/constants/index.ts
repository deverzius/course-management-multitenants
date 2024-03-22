export const TENANT_HEADER = 'x-tenant-id';
export const DATA_SOURCE_TENANT = 'DATA_SOURCE_TENANT';

export enum ROLE {
	ADMIN = 'admin',
	TENANT = 'tenant',
	TENANT_USER = 'tenant_user',
	LEARNER = 'learner',
}

export enum TOKEN_TYPE {
	ACCESS = 'access_token',
	REFRESH = 'refresh_token',
}

export const ROLES_KEY = 'roles';