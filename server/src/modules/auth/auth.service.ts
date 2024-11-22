import { BadRequestException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import UserDto from "src/dto/UserDto";
import { Repository } from "typeorm";
import { User } from "../users/User.entity";
import { Credential } from "./credential.entity";
import * as bcrypt from "bcrypt"
import CredentialDto from "src/dto/CredentialDto";


@Injectable()
export class AuthService {
    constructor(
        private  credentialRepository:Repository<Credential>,
        private  userRpository:Repository<User>
    ){}

    async singUp(user:UserDto):Promise<User>{
        try {
            const exist = await this.credentialRepository.findOne({where:{email:user.email}})
            if(exist)throw new BadRequestException('Email already exist')

            const User = await this.userRpository.create(user)

            const hashedPassword = await bcrypt.hash(user.password, 10)
            const c= await this.credentialRepository.create({
                password:hashedPassword,
                email:user.email,
                user:User
            })
            
            User.credential = c
            await this.credentialRepository.save(c)

            return await this.userRpository.save(User)
        } catch (error) {
            throw error
        }
    }

    async singIn(credentialData:CredentialDto):Promise<User>{
        try {
            const credential = await this.credentialRepository.findOne({where:{email:credentialData.email}})
            if(!credential)throw new HttpException('Email not found', HttpStatus.NOT_FOUND)
            
            const password = await bcrypt.hash(credentialData.password, 10)
            if(password !== credential.password)throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED)
            
            const user = await this.userRpository.findOne({where:{id:credential.user.id}})
            if(!user) throw new HttpException('User not Found', HttpStatus.NOT_FOUND)
        
            return user
        } catch (error) {
            throw error
        }
    }

}