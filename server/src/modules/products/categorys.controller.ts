import { Controller, Headers, HttpException, HttpStatus, Param, Post, Put } from "@nestjs/common";
import { Category } from "./categorys.entity";
import { ProductsDBService } from "./productsDB.service";
import { Product } from "./product.entity";


@Controller('categorys')
export class CategoryController {
    constructor(
        private readonly productsService:ProductsDBService
    ){}

    @Post(':name')
    async createCategory(
        @Param('name') name: string
    ):Promise<Category>{
        try {
            return await this.productsService.newCategory(name)
        } catch (error) {
            if(error instanceof HttpException)throw error
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }

    @Put(':productId')
    async selectCategrys(
        @Param('productId') productId: string,
        @Headers('products') ids: number[]
    ):Promise<Product>{
        try {
            return await this.productsService.selectCategrys(ids,Number(productId))
        } catch (error) {
            if(error instanceof HttpException)throw error
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }
}