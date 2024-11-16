import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import UserDto from 'src/dto/UserDto';
import IUser from 'src/entities/IUser';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {
  }

  @HttpCode(200)
  @Get()
  async getusers(){
    return await this.usersService.getUsers()
  }

  @HttpCode(200)
  @Get(':id')
  async getUser(@Param('id') id: string):Promise<IUser>{
    return await this.usersService.getUser(Number(id));
  }

  @HttpCode(201)
  @Post()
  async NewUser(@Body() newUserData:UserDto): Promise<IUser>{
    return await this.usersService.NewUser(newUserData)
  }

 

}
