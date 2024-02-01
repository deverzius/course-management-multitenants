import { ROLE } from "src/constants";

export type LoginInfo = {
	username: string;
	password: string;
	role?: ROLE;
};

export type JwtPayload = {
	id: string;
	username: string;
	role: ROLE;
};