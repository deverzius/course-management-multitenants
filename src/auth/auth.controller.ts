import { Controller, Post, HttpCode, Body } from '@nestjs/common/decorators';
import { AuthService } from './auth.service';
import { HttpStatus } from '@nestjs/common/enums';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }
}
