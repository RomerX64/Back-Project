import { IsString, IsNumber, IsNotEmpty } from "class-validator"

class ProductDto{
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
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