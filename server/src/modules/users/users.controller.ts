import { Body, Controller, Delete, Get, Headers, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import UserDto from 'src/dto/UserDto';
import CredentialDto from 'src/dto/CredentialDto';
import { UserDBService } from './UserDB.service';
import { User } from './User.entity';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UserDBService) {
  }

  @Get()
  async getusers(){
    return await this.usersService.getUsers()
  }

  @Get(':userId')
  async getUser(
    @Param('userId') userId: string,
    @Headers('email') email: string,
    @Headers('password') password: string
):Promise<User>{
    try {
      return await this.usersService.getUser(userId, {email, password});
    } catch (error) {
      
      throw new HttpException(error, HttpStatus.NOT_FOUND);
    }
  }

  @Post()
  async NewUser(
    @Body() newUserData:UserDto,
    @Body() credentialDta:CredentialDto
  ): Promise<User>{
    try {
      return await this.usersService.newUser(newUserData, credentialDta)
    } catch (error) {
      if(error instanceof HttpException)throw error
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
   
  }


  @Put(':userId')
  async updateUser(
    @Param('userId') userId: string, 
    @Body() updateUserData:UserDto,
    @Headers('token') token: string
  ): Promise<User>{
      try {
        if(!token)throw new HttpException('You do not have permission', HttpStatus.FORBIDDEN)
        if(!updateUserData || Object.keys(updateUserData).length === 0)throw new HttpException('No data provided to update', HttpStatus.NO_CONTENT)
      return await this.usersService.updateUser(userId, updateUserData)
      } catch (error) {
        if(error instanceof HttpException)throw error
        throw new HttpException(error, HttpStatus.BAD_REQUEST);
      }
  }
 
  @Delete(':userId')
  async deleteUser(
    @Param('userId') userId: string,
    @Headers('token') token: string,
    @Body() credentialDta:CredentialDto
    ):Promise<User>{
    try {
      if(!token)throw new HttpException('You do not have permission', HttpStatus.FORBIDDEN)
      if(!credentialDta || Object.keys(credentialDta).length === 0)throw new HttpException('No credentials provider', HttpStatus.BAD_REQUEST)

      return await this.usersService.deleteUser(userId, credentialDta)
    } catch (error) {
      if(error instanceof HttpException)throw error
      throw new HttpException(error, HttpStatus.NOT_FOUND);
    }
  }

}
