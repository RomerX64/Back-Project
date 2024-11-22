import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { User } from "../users/User.entity";
import { Credential } from "./credential.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthService } from "./auth.service";



@Module({
    imports:[TypeOrmModule.forFeature([User , Credential])],
    controllers:[AuthController],
    providers:[AuthService]
})

export class AuthModule{}

