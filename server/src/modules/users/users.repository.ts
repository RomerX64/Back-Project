import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import CredentialDto from 'src/dto/CredentialDto';
import UserDto from 'src/dto/UserDto';
import IUser from 'src/interfaces/IUser';
import { AuthRepository } from '../auth/auth.repository';
import ICredential from 'src/interfaces/ICredential';

@Injectable()
export class UserRepository {
    private users: IUser[] =
      [
        {
          id: 1,
          credentialID: 1001,
          name: "Juan Pérez",
          address: "Calle Ficticia 123, Buenos Aires",
          phone: "+54 9 11 2345 6789",
          country: "Argentina",
          city: "Buenos Aires",
        },
        {
          id: 2,
          credentialID: 1002,
          name: "María Gómez",
          address: "Avenida Siempre Viva 456, Madrid",
          phone: "+34 91 234 5678",
          country: "España",
          city: "Madrid",
        },
        {
          id: 3,
          credentialID: 1003,
          name: "Luis Martínez",
          address: "Calle Mayor 789, Ciudad de México",
          phone: "+52 55 1234 5678",
          country: "México",
          city: "Ciudad de México",
        },
        {
          id: 4,
          credentialID: 1004,
          name: "Ana Sánchez",
          address: "Plaza del Sol 101, Lima",
          phone: "+51 1 234 5678",
          country: "Perú",
          city: "Lima",
        },
        {
          id: 5,
          credentialID: 1005,
          name: "Pedro Rodríguez",
          address: "Calle del Carmen 333, Bogotá",
          phone: "+57 1 234 5678",
          country: "Colombia",
          city: "Bogotá",
        },
      ]
    constructor(
      private authRepository:AuthRepository
    ){}
    async getUsers():Promise<IUser[]> {
        return this.users;
    }

    async getUser(id:number):Promise<IUser> {
      try {
        const User = this.users.find(user => user.id === id)
        if(!User)throw new Error('User not found')
        return User
      } catch (error) {
        throw new HttpException(error, HttpStatus.NOT_FOUND)
      } 
    }

    async NewUser(newUserData:UserDto):Promise<IUser> {
      try {
        const {email, password}:CredentialDto = newUserData
        const C:ICredential= await this.authRepository.newCredential({email, password}, this.users.length +1)
        const User = {
          id:this.users.length +1,
          name: newUserData.name,
          address: newUserData.address,
          phone: newUserData.phone,
          country: newUserData.country,
          city: newUserData.city,
          credentialID: C.id
        }
        this.users = [...this.users, User]
        console.log('newUser', C)
        return User
      } catch (error) {
        throw new HttpException(error, HttpStatus.BAD_REQUEST)
      }
    }

    async updateUser(id:number, updateUserData:UserDto):Promise<IUser> {
      const User = await this.getUser(id)
      if(!User)throw new Error('User not found')
      return Object.assign(User, updateUserData)
    }

  async deleteUser(id:number, credentialDta:CredentialDto):Promise<IUser>{
    try {
      const User = await this.getUser(id)

      if(!User)throw new HttpException('User not found', HttpStatus.NOT_FOUND)

      const T = this.authRepository.deleteCredential(credentialDta, User.id)

      if(!T)throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED)

      this.users = this.users.filter(user => user.id !== id)

      return User

    } catch (error) {
      if(error instanceof HttpException) throw error
      throw new HttpException(error, HttpStatus.NOT_ACCEPTABLE);
    }
  }


}
