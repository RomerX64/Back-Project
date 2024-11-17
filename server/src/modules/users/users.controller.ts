import { Body, Controller, Delete, Get, Headers, HttpCode, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
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
    try {
      return await this.usersService.getUser(Number(id));
    } catch (error) {
      
      throw new HttpException(error, HttpStatus.NOT_FOUND);
    }
  }

  @HttpCode(201)
  @Post()
  async NewUser(@Body() newUserData:UserDto): Promise<IUser>{
    return await this.usersService.NewUser(newUserData)
  }


  @Put(':id')
  async updateUser(
    @Param('id') id: string, 
    @Body() updateUserData:UserDto,
    @Headers('token') token: string
  ): Promise<IUser>{
      try {
        if(!token)throw new HttpException('You do not have permission', HttpStatus.FORBIDDEN)
        if(!updateUserData || Object.keys(updateUserData).length === 0)throw new HttpException('No data provided to update', HttpStatus.NO_CONTENT)
      return await this.usersService.updateUser(Number(id), updateUserData)
      } catch (error) {
        if(error instanceof HttpException)throw error
        throw new HttpException(error, HttpStatus.BAD_REQUEST);
      }
  }
 
  @Delete(':id')
  async deleteUser(@Param('id') id: string, @Headers('token') token: string):Promise<IUser>{
    try {
      if(!token)throw new HttpException('You do not have permission', HttpStatus.FORBIDDEN)
      return await this.usersService.deleteUser(Number(id))
    } catch (error) {
      if(error instanceof HttpException)throw error
      throw new HttpException(error, HttpStatus.NOT_FOUND);
    }
  }

}
