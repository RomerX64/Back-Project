import { IsArray, IsNotEmpty } from "class-validator"
import IProduct from "src/interfaces/IProduct"


class OrderDto{
    @IsNotEmpty()
    @IsArray()
    products: IProduct[]
}

export default OrderDto