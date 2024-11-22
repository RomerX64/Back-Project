import { IsString, IsNumber, IsNotEmpty, MaxLength } from "class-validator"

class ProductDto{
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    description: string

    @IsNotEmpty()
    @IsNumber()
    price: number
    
    @IsNotEmpty()
    @IsNumber()
    stock: number
    
    @IsString()
    imgUrl: string
}

export default ProductDto