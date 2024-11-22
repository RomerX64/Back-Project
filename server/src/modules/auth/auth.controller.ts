import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import ICredential from "src/interfaces/ICredential";
import CredentialDto from "src/dto/CredentialDto";
import { IsAdminGuard } from "src/guards/isAdmin.guard";

@Controller('auth')

export class AuthController{
    constructor (
        private readonly authService:AuthService
    ){}

    @Get(':userId')
    @UseGuards(IsAdminGuard)
    async getEmailByUserId(
        @Param('userId') userId:string,
    ):Promise<string>{
        try {
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