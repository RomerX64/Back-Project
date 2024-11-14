import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserRepository } from './users.repository';
import { UsersController } from './users.controller';

@Module({
  providers: [UsersService, UserRepository],
  controllers: [UsersController],
})
export class UserModule {}
