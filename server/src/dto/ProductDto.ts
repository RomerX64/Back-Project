import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsNumber, IsNotEmpty, MaxLength } from "class-validator"

class ProductDto{
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        description:'must be string, can not empty',
        example:'Iphone 12'
    })
    name: string

    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    @ApiProperty({
        description:'must be string, can not empty, max 50 characters',
        example:'This is the best smartphone in the world for you'
    })
    description: string

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({
        description:'must be number, can not empty',
        example:299.99
    })
    price: number
    
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({
        description:'must be number, can not empty',
        example:10
    })
    stock: number
    
    @IsString()
    @ApiProperty({
        description:'must be string, can not empty',
        example:'Iphone 12'
    })
    imgUrl: string
}

export default ProductDto