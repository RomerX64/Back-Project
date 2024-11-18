import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AuthRepository } from "./auth.repository";
import { User } from "../users/User.entity";
import { Credential } from "./credential.entity";
import { TypeOrmModule } from "@nestjs/typeorm";



@Module({
    imports:[TypeOrmModule.forFeature([User , Credential])],
    controllers:[AuthController],
    providers:[AuthService, AuthRepository]
})

export class AuthModule{}

