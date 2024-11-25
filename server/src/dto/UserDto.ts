import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsNotEmpty, IsEmail, MinLength, IsEmpty } from "class-validator"

class UserDto{
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @ApiProperty({
        description:'must be email',
        example:'example@gmail.com'
    })
    email: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        description:'must be a min length of 5 characters, do not include spaces, must do not use a special characters',
        example:'Tomas Romera'
    })
    name: string  

    @IsNotEmpty()
    @IsString()    
    @MinLength(5)
    @ApiProperty({
        description:'must be a min length of 5 characters'
    })
    password: string  

    @IsNotEmpty()
    @IsString()    
    address: string

    @IsNotEmpty()
    @IsString()    
    phone: string

    @IsEmpty()
    isAdmin:boolean

    
    country?: string | undefined

    city?: string | undefined
}

export default UserDto