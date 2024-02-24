import { BadRequestException } from "@nestjs/common";
import { NextFunction } from "express";
import { TENANT_HEADER } from "src/constants";

export function checkTenantId(req: Request, res: Response, next: NextFunction) {
	const tenantId = req.headers[TENANT_HEADER] as string;
	const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
	
	if (!tenantId || !uuidRegex.test(tenantId)) {
		return next(new BadRequestException('Missing or invalid Tenant ID'));
	}
	
	next();
}