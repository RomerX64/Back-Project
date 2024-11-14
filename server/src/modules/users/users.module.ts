import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserRepository } from './users.repository';

@Module({
  providers: [UsersService, UserRepository],
})
export class UserModule {}
