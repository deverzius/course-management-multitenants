import { InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { NextFunction } from "express";
import { TOKEN_TYPE } from "src/constants";
import { AuthUtils } from "src/utils/auth.utils";

export function checkToken(req: Request, res: Response, next: NextFunction) {
	const token = req.headers['authorization']?.split(' ')[1];

	if (!token) {
		return next(new UnauthorizedException('Token not found'));
	}

	const isValid = AuthUtils.getInstance().verifyToken(token);
	if (!isValid) { 
		return next(new UnauthorizedException('Invalid token'));
	}

	const tokenType = AuthUtils.getInstance().getTokenType(token);
	if (tokenType === TOKEN_TYPE.ACCESS) {
		return next();
	}

	next();
}