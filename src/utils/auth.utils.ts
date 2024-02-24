import { TOKEN_TYPE } from 'src/constants';
import { JwtPayload } from '../modules/auth/dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

interface IJwtReturnType {
  accessToken: string;
  refreshToken: string;
}

export class AuthUtils {
  private static instance: AuthUtils;
  private jwtService: JwtService;

  private constructor() {}

  public static getInstance(): AuthUtils {
    if (!this.instance) {
      this.instance = new AuthUtils();
    }
    return this.instance;
  }

  private getJwtService(): JwtService { 
    if (!this.jwtService) {
      this.jwtService = new JwtService();
    }
    return this.jwtService;
  }

  private generateToken(payload: JwtPayload, tokenType: TOKEN_TYPE): string {
    return this.getJwtService().sign(
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

  verifyToken(token: string): boolean {
    try {
      this.getJwtService().verify(token, {
        secret: process.env.SECRET_KEY,
      });
    } catch (error) {
      return false;
    }
    return true;
  }

  getTokenType(token: string): TOKEN_TYPE {
    const payload = this.getJwtService().decode(token) as JwtPayload;
    return payload.type;
  }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, await bcrypt.genSalt());
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
