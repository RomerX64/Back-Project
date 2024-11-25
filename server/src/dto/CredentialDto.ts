import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator"


class CredentialDto{
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({
        description:'must be email',
        example:'romera@gmail.com'
    })
    email:string

    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @ApiProperty({
        description:'must be a min length of 5 characters',
        example:'admin'
    })
    password:string

}

export default CredentialDto
