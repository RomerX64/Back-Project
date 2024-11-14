import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
    private users = [
        {
            id: 1,
            name: 'Alice Johnson',
            email: 'alice.johnson@example.com'
        },
        {
            id: 2,
            name: 'Bob Smith',
            email: 'bob.smith@example.com'
        },
        {
            id: 3,
            name: 'Charlie Brown',
            email: 'charlie.brown@example.com'
        },
        {
            id: 4,
            name: 'Diana Prince',
            email: 'diana.prince@example.com'
        },
        {
            id: 5,
            name: 'Edward Norton',
            email: 'edward.norton@example.com'
        }
        
    ]
    async getUsers() {
        return this.users;
    }
}
