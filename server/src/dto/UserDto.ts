import { IsString, IsNotEmpty, IsEmail, MinLength } from "class-validator"

class UserDto{
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsString()
    name: string  

    @IsNotEmpty()
    @IsString()    
    @MinLength(5)
    password: string  

    @IsNotEmpty()
    @IsString()    
    address: string

    @IsNotEmpty()
    @IsString()    
    phone: string

    @IsString()
    country?: string | undefined

    @IsString()
    city?: string | undefined
}

export default UserDto