import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './User.entity';
import { Credential } from '../auth/credential.entity';
import { UserDBService } from './UserDB.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Credential])
  ],
  providers: [UserDBService],
  controllers: [UsersController],
})
export class UserModule {}
