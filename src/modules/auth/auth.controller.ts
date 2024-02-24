import { Body, Controller, Post, Req, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginInfo } from './dto';
import { CreateTenantDto } from '../tenants/dto/create-tenant.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  
  @Post('/tenants')
  loginForTenant(@Body() loginInfo: LoginInfo) {
    return this.authService.loginForTenant(loginInfo);
  }

  @Post('/tenants/register')
  registerForTenant(@Body() createTenantDto: CreateTenantDto) {
    return this.authService.createTenant(createTenantDto);
  }

  @Post('/users')
  loginForUser(@Body() loginInfo: LoginInfo) {
    return this.authService.loginForUser(loginInfo);
  }

  @Post('/users/register')
  registerForUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.createUser(createUserDto);
  }

  // @Post('/test')
  // test(@Headers() headers: Headers ){
  //   return this.authService.test(headers);
  // }
}
