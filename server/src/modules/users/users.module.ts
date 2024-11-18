import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserRepository } from './users.repository';
import { UsersController } from './users.controller';
import { AuthRepository } from '../auth/auth.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './User.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User])
  ],
  providers: [UsersService, UserRepository, AuthRepository],
  controllers: [UsersController],
})
export class UserModule {}
