import { ApiProperty } from "@nestjs/swagger"
import { IsArray, IsNotEmpty } from "class-validator"
import IProduct from "src/interfaces/IProduct"


class OrderDto{
    @IsNotEmpty()
    @IsArray()
    @ApiProperty({
        description:'must be array, can not empty, this is the products id',
        example:[1,2,3]
    })
    products: IProduct[]
}

export default OrderDto