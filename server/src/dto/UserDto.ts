import { IsString, IsNotEmpty, IsEmail } from "class-validator"

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
    password: string  
    @IsNotEmpty()
    @IsString()    
    address: string

    @IsNotEmpty()
    @IsString()    
    phone: string

    country?: string | undefined

    city?: string | undefined
}

export default UserDto