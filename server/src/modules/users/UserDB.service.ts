import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./User.entity";
import { Repository } from "typeorm";
import CredentialDto from "src/dto/CredentialDto";
import UserDto from "src/dto/UserDto";
import { Credential } from "../auth/credential.entity";


@Injectable()
export class UserDBService{
    constructor(
        @InjectRepository(User) private userRepository:Repository<User>,
        @InjectRepository(Credential) private credentialRepository:Repository<Credential>
    ){}

    async newUser(newUserData: UserDto, credentialDta: CredentialDto): Promise<User> {
        try {
          const existingCredential: Credential | undefined = await this.credentialRepository.findOne({
            where: { email: credentialDta.email },
          });
          if (existingCredential)throw new HttpException('User already exists', HttpStatus.CONFLICT)
      
          const user: User = this.userRepository.create(newUserData);
          if (!user)throw new HttpException('Error to create your User', HttpStatus.NOT_IMPLEMENTED)
      
          const credential: Credential = this.credentialRepository.create(credentialDta);
          if (!credential)throw new HttpException('Error to create your credential', HttpStatus.NOT_IMPLEMENTED)
          
            await this.userRepository.save(user);
      
          user.credential = credential;
          await this.credentialRepository.save(credential);
      

          return user; 
        } catch (error) {
          throw error;
        }
      }

    async getUser(userId:string, credentialDta:CredentialDto):Promise<User>{
        try {
            const user:User|undefined = await this.userRepository.findOne({   
                where: { id: userId },
                relations: ['credential']
            })
            if(!user)throw new HttpException('User not found', HttpStatus.NOT_FOUND)
            if(user.credential.email !== credentialDta.email)throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED)
            if(user.credential.password !== credentialDta.password)throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED)
            
            return user
        } catch (error) {
            throw error
        }
    }

    async getUsers():Promise<User[]>{
        try {
            const users:User[] | undefined = await this.userRepository.find()
            if(!users)throw new HttpException('Users not found', HttpStatus.NOT_FOUND)
            return users
        } catch (error) {
            throw error
        }
    }

    async deleteUser(userId:string, credentialDta:CredentialDto):Promise<User>{
        try {
            const user:User|undefined = await this.userRepository.findOne({   
                where: { id: userId },
                relations: ['credential']
            })
            if(!user)throw new HttpException('User not found', HttpStatus.NOT_FOUND)
            if(user.credential.email !== credentialDta.email)throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED)
            if(user.credential.password !== credentialDta.password)throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED)
            this.userRepository.remove(user)
            return user
        } catch (error) {
            throw error
        }
    }

    async updateUser(userId:string, userdta:UserDto):Promise<User>{
        try {
            const user:User|undefined = await this.userRepository.findOne({   
                where: { id: userId },
            })
            if(!user)throw new HttpException('User not found', HttpStatus.NOT_FOUND)
            user.name = userdta.name
            user.address = userdta.address
            user.phone = userdta.phone
            user.country = userdta.country
            user.city = userdta.city
            this.userRepository.save(user)
            return user
        } catch (error) {
            throw error
        }
    }

}