import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./User.entity";
import { Repository } from "typeorm";
import CredentialDto from "../../dto/CredentialDto";
import UserDto from "../../dto/UserDto";
import { Credential } from "../auth/credential.entity";
import * as bcrypt from "bcrypt"


@Injectable()
export class UserDBService{
    constructor(
        @InjectRepository(User) private userRepository:Repository<User>,
        @InjectRepository(Credential) private credentialRepository:Repository<Credential>
    ){}

    async getUsers():Promise<User[]>{
        try {
            const users:User[] | undefined = await this.userRepository.find()
            if(!users)throw new HttpException('Users not found', HttpStatus.NOT_FOUND)
            return users
        } catch (error) {
            throw error
        }
    }

    async getUserById(id:string):Promise<User>{
        try {
            const User = await this.userRepository.findOne({where:{id:id}})
            if(!User)throw new HttpException('User not found', HttpStatus.NOT_FOUND)
            
            return User
        } catch (error) {
            throw error
        }
    }

    async deleteUser(userId:string, credentialDta:CredentialDto):Promise<User>{
        try {
            const credential = await this.credentialRepository.findOne({where:{email:credentialDta.email}})
            if(!credential)throw new HttpException('Email not found', HttpStatus.NOT_FOUND)
            
            const password = await bcrypt.hash(credentialDta.password, 10)
            if(password !== credential.password)throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED)
            
            const user = await this.userRepository.findOne({where:{id:credential.user.id}})
            if(!user) throw new HttpException('User not Found', HttpStatus.NOT_FOUND)

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