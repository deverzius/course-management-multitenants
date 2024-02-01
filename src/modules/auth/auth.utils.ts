import { TOKEN_TYPE } from 'src/constants';
import { JwtPayload } from './dto';
import { JwtService } from '@nestjs/jwt';

interface IJwtReturnType {
  accessToken: string;
  refreshToken: string;
}

export class AuthUtils {
  private static instance: AuthUtils;
  private static jwtService: JwtService;

  private constructor() {}

  public static getInstance(): AuthUtils {
    if (!this.instance) {
			this.instance = new AuthUtils();
			this.jwtService = new JwtService();
    }

    return this.instance;
  }

  private generateToken(payload: JwtPayload, tokenType: TOKEN_TYPE): string {
    return AuthUtils.jwtService.sign(
      {
        id: payload.id,
        username: payload.username,
        role: payload.role,
        type: tokenType,
      },
      {
        secret: process.env.SECRET_KEY,
        expiresIn:
          tokenType === TOKEN_TYPE.ACCESS
            ? process.env.ACCESS_TOKEN_LIFE
            : process.env.REFRESH_TOKEN_LIFE,
      },
    );
  }

  signPayload(payload: JwtPayload): IJwtReturnType {
    return {
      accessToken: this.generateToken(payload, TOKEN_TYPE.ACCESS),
      refreshToken: this.generateToken(payload, TOKEN_TYPE.REFRESH),
    };
  }

  verifyAccessToken(accessToken: string): boolean {
    try {
      AuthUtils.jwtService.verify(accessToken, {
        secret: process.env.SECRET_KEY,
      });
    } catch (error) {
      console.log(error);
      return false;
    }

    return true;
  }
}