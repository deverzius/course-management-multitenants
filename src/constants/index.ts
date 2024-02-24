export const TENANT_HEADER = 'x-tenant-id';
export const DATA_SOURCE_TENANT = 'DATA_SOURCE_TENANT';

export enum ROLE {
	ADMIN = 'admin',
	TENANT = 'tenant',
	INSTRUCTOR = 'instructor',
	TEACHING_ASSISTANT = 'teaching_assistant',
	LEARNER = 'learner',
}

export enum TOKEN_TYPE {
	ACCESS = 'access_token',
	REFRESH = 'refresh_token',
}

export const ROLES_KEY = 'roles';