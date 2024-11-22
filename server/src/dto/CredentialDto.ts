import { IsEmail, IsNotEmpty, IsString } from "class-validator"


class CredentialDto{
    @IsNotEmpty()
    @IsEmail()
    @IsString()
    email:string

    @IsNotEmpty()
    @IsString()
    password:string
}
export default CredentialDto
