import { Injectable } from '@nestjs/common';
import { UserRepository } from './users.repository';
import IUser from 'src/entities/IUser';
import UserDto from 'src/dto/UserDto';

@Injectable()
export class UsersService {
    constructor(
        private usersRepository: UserRepository
    ) {}
    async getUsers() {
        return this.usersRepository.getUsers();
    }   

    async NewUser(newUserData:UserDto):Promise<IUser>{
        return this.usersRepository.NewUser(newUserData)
    }
}
