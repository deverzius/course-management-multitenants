import { ROLE } from "src/constants";

export class CreateUserDto {
	username: string;
	password: string;
	name: string;
	description: string;
	role: ROLE;
}
