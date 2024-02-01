import { ROLE } from "src/constants";
import { User } from "../entities/user.entity";

export class ReturnUserDto {
  static fromUser(user: User, accessToken: string, refreshToken: string) {
    const returnUserDto = new ReturnUserDto();
    const { id, password, ...temp } = user;

    Object.assign(returnUserDto, temp);
    returnUserDto.accessToken = accessToken;
    returnUserDto.refreshToken = refreshToken;

    return returnUserDto;
  }

  username: string;
  name: string;
  description: string;
  role: ROLE;
  accessToken: string;
  refreshToken: string;
}
