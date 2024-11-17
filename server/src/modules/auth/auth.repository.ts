import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import CredentialDto from "src/dto/CredentialDto";
import ICredential from "src/entities/ICredential";


@Injectable()
export class AuthRepository{
    private credentials:ICredential[] = [
        {
        id: 1,
        userId: 1,
        password: "securePassword123",
        email: "user1@example.com"
      },
      {
        id: 2,
        userId: 2,
        password: "passwordStrong!45",
        email: "user2@example.com"
      },
      {
        id: 3,
        userId: 3,
        password: "mypassword567@",
        email: "user3@example.com"
      },
      {
        id: 4,
        userId: 4,
        password: "pass@w0rd888",
        email: "user4@example.com"
      },
      {
        id: 5,
        userId: 5,
        password: "UltraSecure!99",
        email: "user5@example.com"
      }] 
    
    async newCredential(credentialDta:CredentialDto, userId:number):Promise<number>{
        const exist = this.credentials.some(c => c.email === credentialDta.email)
        if(exist)throw new HttpException('Email already exist', HttpStatus.BAD_REQUEST)
        const c = {
            id: this.credentials.length + 1,
            ...credentialDta,
            userId
        }
        return c.id
    }

    async getCredential(credentialDta:CredentialDto):Promise<ICredential>{
        try {
            const credential:ICredential = this.credentials.find(c => c.email === credentialDta.email)
            if(!credential)throw new HttpException('Credential not found', HttpStatus.NOT_FOUND)
            if(credential.password !== credentialDta.password) throw new HttpException('Email o password incorrect', HttpStatus.UNAUTHORIZED)
            return credential
        } catch (error) {
            throw error
        }
    }

    async getCredentialByID(userId:number):Promise<number>{
        try {
            const credential = this.credentials.find(o => o.userId === userId)
            if(!credential)throw new HttpException('Credential no found', HttpStatus.NOT_FOUND)
            return credential.id
        } catch (error) {
            throw error
        }
    }
    async deleteCredential(credentialDta:CredentialDto):Promise<boolean>{
        try {
            const c:ICredential = await this.getCredential(credentialDta)
            if(!c)throw new HttpException('Credential not found', HttpStatus.NOT_FOUND)
            this.credentials = this.credentials.filter(cd => cd.id !== c.id)
            return true
        } catch (error) {
            throw error
        }
    }
}