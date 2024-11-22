import { IsArray, IsNotEmpty } from "class-validator"

class CategoryProductDto {
    @IsArray()
    @IsNotEmpty()
    categories:number[]

    @IsArray()
    @IsNotEmpty()
    products:number[]
}
export default CategoryProductDto