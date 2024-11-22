import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseUUIDPipe, Put, UseGuards } from '@nestjs/common';
import UserDto from 'src/dto/UserDto';
import CredentialDto from 'src/dto/CredentialDto';
import { UserDBService } from './UserDB.service';
import { User } from './User.entity';
import { AuthGuard } from 'src/guards/auth.guard';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UserDBService) {
  }

  @Get()
  async getusers(){
    return await this.usersService.getUsers()
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async getUserById(
    @Param('Id') id:string
  ):Promise<User>{
    try {
      return await this.usersService.getUserById(id)
    } catch (error) {
      if(error instanceof HttpException)throw error
      throw new HttpException(error,HttpStatus.CONFLICT)
    }
  }

  @Put(':userId')
  @UseGuards(AuthGuard)
  async updateUser(
    @Param('userId', ParseUUIDPipe) userId: string, 
    @Body() updateUserData:UserDto,
  ): Promise<User>{
      try {
        if(!updateUserData || Object.keys(updateUserData).length === 0)throw new HttpException('No data provided to update', HttpStatus.NO_CONTENT)
      return await this.usersService.updateUser(userId, updateUserData)
      } catch (error) {
        if(error instanceof HttpException)throw error
        throw new HttpException(error, HttpStatus.BAD_REQUEST);
      }
  }
 
  @Delete(':userId')
  @UseGuards(AuthGuard)
  async deleteUser(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body() credentialDta:CredentialDto
    ):Promise<User>{
    try {
      if(!credentialDta || Object.keys(credentialDta).length === 0)throw new HttpException('No credentials provider', HttpStatus.BAD_REQUEST)

      return await this.usersService.deleteUser(userId, credentialDta)
    } catch (error) {
      if(error instanceof HttpException)throw error
      throw new HttpException(error, HttpStatus.NOT_FOUND);
    }
  }

}
