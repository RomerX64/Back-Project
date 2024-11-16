import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import UserDto from 'src/dto/UserDto';
import IUser from 'src/entities/IUser';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }
  
  @Get()
  async getusers(){
    return this.usersService.getUsers()
  }

  @Post()

  async NewUser(@Body() newUserData:UserDto): Promise<IUser>{
    return this.usersService.NewUser(newUserData)
  }



}
