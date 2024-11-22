import { BadRequestException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import UserDto from "../../dto/UserDto";
import { Repository } from "typeorm";
import { User } from "../users/User.entity";
import { Credential } from "./credential.entity";
import * as bcrypt from "bcrypt"
import CredentialDto from "../../dto/CredentialDto";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtService } from "@nestjs/jwt";
import { Role } from "./roles.enum";


@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Credential) private credentialRepository:Repository<Credential>,
        @InjectRepository(User) private  userRpository:Repository<User>,
        private readonly jwtService:JwtService
    ){}

    async singUp(user:UserDto):Promise<User>{
        try {
            const exist = await this.credentialRepository.findOne({where:{email:user.email}})
            if(exist)throw new BadRequestException('Email already exist')

            const User = await this.userRpository.create(user)
            await this.userRpository.save(User)

            const hashedPassword = await bcrypt.hash(user.password, 10)
            const credential= await this.credentialRepository.create({
                password:hashedPassword,
                email:user.email,
                user:User
            })
            await this.credentialRepository.save(credential)
            User.credential = credential

            return await this.userRpository.save(User)
        } catch (error) {
            throw error
        }
    }

    async singIn(credentialData:CredentialDto){
        try {
            const credential = await this.credentialRepository.findOne({where:{email:credentialData.email}, relations:['user']})
            if(!credential)throw new HttpException('Email not found', HttpStatus.NOT_FOUND)

            const isPasswordValid = await bcrypt.compare(credentialData.password, credential.password)
            if(!isPasswordValid)throw new HttpException('Invalid password', HttpStatus.UNAUTHORIZED)

            const user = await this.userRpository.findOne({where:{id:credential.user.id}})
            if(!user) throw new HttpException('User not Found', HttpStatus.NOT_FOUND)
            
            const userPayload ={
                sub:user.id,
                id:user.id,
                email:credential.email,
                roles: [user.isAdmin? Role.Admin : Role.User]
            }
                
            const token = this.jwtService.sign(userPayload)
            return {success:'User logged successfully', token}
        } catch (error) {
            throw error
        }
    }

}