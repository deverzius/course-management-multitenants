import { Module } from '@nestjs/common/decorators';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule, UsersModule],
})
export class AppModule {}
