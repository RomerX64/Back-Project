import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from './users.repository';
import IUser from 'src/entities/IUser';
import UserDto from 'src/dto/UserDto';

@Injectable()
export class UsersService {
    constructor(
        private usersRepository: UserRepository
    ) {}
    async getUsers():Promise<IUser[]> {
        try {
            return this.usersRepository.getUsers();         
        } catch (error) {
            throw new HttpException(error, HttpStatus.NOT_FOUND);
        }
    }   

    async getUser(id:number):Promise<IUser>{
        try {
            return this.usersRepository.getUser(id);
        } catch (error) {
            throw new HttpException(error, HttpStatus.NOT_FOUND);
        }
    }

    async NewUser(newUserData:UserDto):Promise<IUser>{
        try {
            return this.usersRepository.NewUser(newUserData)

        } catch (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);      
        }
    }

    async updateUser(id:number, updateUserData:UserDto):Promise<IUser> {
        try {
            return this.usersRepository.updateUser(id, updateUserData)
        } catch (error) {
            throw new HttpException(error, HttpStatus.NOT_FOUND);
        }
    }

    async deleteUser(id:number):Promise<IUser>{
        try {
            return this.usersRepository.deleteUser(id)
        } catch (error) {
            throw new HttpException(error, HttpStatus.NOT_FOUND);
        }
    }
}
