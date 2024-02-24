import { ROLE, TOKEN_TYPE } from "src/constants";

export type LoginInfo = {
	username: string;
	password: string;
	role?: ROLE;
};