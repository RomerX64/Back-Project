import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserRepository } from './users.repository';
import { UsersController } from './users.controller';
import { AuthRepository } from '../auth/auth.repository';

@Module({
  providers: [UsersService, UserRepository, AuthRepository],
  controllers: [UsersController],
})
export class UserModule {}
