import { Body, Controller, HttpException, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { User } from "../users/User.entity";
import UserDto from "src/dto/UserDto";
import CredentialDto from "src/dto/CredentialDto";

@Controller('auth')

export class AuthController{
    constructor (
        private readonly authService:AuthService
    ){}

    @Post('singUp')
    async singUp(
        @Body() user:UserDto
    ):Promise<User>{
        try {
            return await this.authService.singUp(user)
        } catch (error) {
            if(error instanceof HttpException)throw error
            throw new HttpException(error, HttpStatus.CONFLICT)
        }
    }

    @Post('singIn')
    async singIn(
        @Body() credentialData:CredentialDto
    ):Promise<User>{
        try {
            return await this.authService.singIn(credentialData)
        } catch (error) {
            if(error instanceof HttpException)throw error
            throw new HttpException(error, HttpStatus.CONFLICT)
        }
    }

}