import { Body, Controller, Get, Headers, HttpException, HttpStatus, Param, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import ICredential from "src/interfaces/ICredential";
import CredentialDto from "src/dto/CredentialDto";

@Controller('auth')

export class AuthController{
    constructor (
        private readonly authService:AuthService
    ){}

    @Get(':userId')
    async getEmailByUserId(
        @Param('userId') userId:string,
        @Headers('range') range:string,
        @Headers('password') password:string
    ):Promise<string>{
        try {
            if(password !== 'admin')throw new HttpException('you do not have permission', HttpStatus.UNAUTHORIZED)
            if(range !== 'admin')throw new HttpException('you do not have permission', HttpStatus.UNAUTHORIZED)
            return this.authService.getEmailByUserId(Number(userId))
        } catch (error) {
         if(error instanceof HttpException)throw error
         throw new HttpException(error, HttpStatus.CONFLICT)   
        }
    }

    @Post()
    async getCredential(
        @Body() credentialDta:CredentialDto,
    ):Promise<ICredential>{
        try {
            if(!credentialDta || Object.keys(credentialDta).length === 0 )throw new HttpException('No data provided to update',HttpStatus.NO_CONTENT)
                return this.authService.getCredential( credentialDta)
        } catch (error) {
            if(error instanceof HttpException)throw error
            throw new HttpException(error, HttpStatus.CONFLICT)
        }
    }

    
}