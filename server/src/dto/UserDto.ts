import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsNotEmpty, IsEmail, MinLength, IsEmpty, MaxLength } from "class-validator"

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
        description:'must be a min length of 5 characters',
        example:'strongpassword!1234'
    })
    password: string  

    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    @ApiProperty({
        description:'max length 50 characters, must be string',
        example:'Avellaneda 122'
    }) 
    address: string


    @IsString()    
    @ApiProperty({
        description:'must be string, not number',
        example:'1234567890'
    })
    phone: string

    @IsEmpty()
    @ApiProperty({
        description:'must be empty',
        default:false,
    })
    isAdmin:boolean

    @IsString()
    @MaxLength(50)
    @ApiProperty({
        description:'can be empty, max 50 characters',
        example:'Argentina'
    })
    country?: string | undefined

    @IsString()
    @MaxLength(50)
    @ApiProperty({
        description:'can be empty, max 50 characters',
        example:'Cordoba'
    })
    city?: string | undefined
}

export default UserDto