import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import CredentialDto from "src/dto/CredentialDto";
import ICredential from "src/interfaces/ICredential";


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
    
    async newCredential(credentialDta:CredentialDto, userId:number):Promise<ICredential>{
        const exist = this.credentials.some(c => c.email === credentialDta.email)
        if(exist)throw new HttpException('Email already exist', HttpStatus.BAD_REQUEST)
        const c = {
            id: this.credentials.length + 1,
            email:credentialDta.email,
            password:credentialDta.password,
            userId,
        }
        this.credentials.push(c);
        console.log('newCredential',c)
        console.log(this.credentials)
        return c
    }

    async getCredential(credentialDta:CredentialDto):Promise<ICredential>{
        try {
            console.log(this.credentials)
            const credential:ICredential = this.credentials.find(c => c.email === credentialDta.email)
            if(!credential)throw new HttpException('Credential not found', HttpStatus.NOT_FOUND)
            if(credential.password !== credentialDta.password) throw new HttpException('Email o password incorrect', HttpStatus.UNAUTHORIZED)
            return credential
        } catch (error) {
            throw error
        }
    }

    async getEmailByUserId(userId:number):Promise<string>{
        try {
            const credential = this.credentials.find(o => o.userId === userId)
            if(!credential)throw new HttpException('Credential no found', HttpStatus.NOT_FOUND)
            return credential.email
        } catch (error) {
            throw error
        }
    }
    async deleteCredential(credentialDta:CredentialDto, userId:number):Promise<boolean>{
        try {
            const c:ICredential = await this.getCredential(credentialDta)

            if(!c)throw new HttpException('Credential not found', HttpStatus.NOT_FOUND)
            if(c.userId !== userId)throw new HttpException('Invalid Credentials', HttpStatus.BAD_REQUEST)

           this.credentials = this.credentials.filter(cd => cd.email !== c.email);

            return true
        } catch (error) {
            throw error
        }
    }
}