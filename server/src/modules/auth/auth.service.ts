import { Injectable } from "@nestjs/common";
import { AuthRepository } from "./auth.repository";
import CredentialDto from "src/dto/CredentialDto";
import ICredential from "src/entities/ICredential";



@Injectable()
export class AuthService{
    constructor(
        private authRepository:AuthRepository
    ){}

    async getCredential(credentialDta:CredentialDto):Promise<ICredential>{
        try {
            return this.authRepository.getCredential(credentialDta)
        } catch (error) {
            throw error
        }
    }

    async getEmailByUserId(userId:number):Promise<string>{
        try {
            return this.authRepository.getEmailByUserId(userId)
        } catch (error) {
            throw error
        }
    }


}