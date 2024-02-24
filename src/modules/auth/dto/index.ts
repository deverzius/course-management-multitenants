import { ROLE, TOKEN_TYPE } from "src/constants";

export type LoginInfo = {
	username: string;
	password: string;
	role?: ROLE;
};

export type JwtPayload = {
	id: string;
	username: string;
	type?: TOKEN_TYPE;
	role: ROLE;
};