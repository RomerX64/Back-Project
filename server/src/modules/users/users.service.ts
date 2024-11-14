import { Injectable } from '@nestjs/common';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {

    constructor(
        private usersRepository: UserRepository
    ) {}

    getUsers() {
        return this.usersRepository.getUsers();
    }
}
