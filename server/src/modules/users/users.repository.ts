import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import UserDto from 'src/dto/UserDto';
import ICredential from 'src/entities/ICredential';
import IUser from 'src/entities/IUser';

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

    async newCredential({email, password, id}): Promise<ICredential> {
      return {
        id:1,
        email,
        password,
        userId:id
      }
    }

    async NewUser(newUserData:UserDto):Promise<IUser> {
      try {
        const {email, password} = newUserData
        const id = 1
        const credential = await this.newCredential({email, password, id})
  
        const User = {
          id,
          name: newUserData.name,
          address: newUserData.address,
          phone: newUserData.phone,
          country: newUserData.country,
          city: newUserData.city,
          credentialID: credential.id
        }
  
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


}
