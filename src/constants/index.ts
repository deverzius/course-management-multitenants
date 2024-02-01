export const TENANT_HEADER = 'x-tenant-id';

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