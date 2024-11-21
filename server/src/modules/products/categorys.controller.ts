import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put } from "@nestjs/common";
import { Category } from "./categorys.entity";
import { ProductsDBService } from "./productsDB.service";
import { Product } from "./product.entity";
import CategoryProductDto from "src/dto/CategoryProductDto";


@Controller('categories')
export class CategoryController {
    constructor(
        private readonly productsService:ProductsDBService
    ){}

    @Get()
    async getCategories():Promise<Category[]>{
        try {
            return await this.productsService.getCategories()
        } catch (error) {
            if(error instanceof HttpException)throw error
            throw new HttpException(error, HttpStatus.CONFLICT)

        }
    }

    @Post()
    async createCategories(
        @Body() names:string[]
    ):Promise<Category[]>{
        try {
            return await this.productsService.newCategorys(names)
        } catch (error) {
            if(error instanceof HttpException)throw error
            throw new HttpException(error, HttpStatus.CONFLICT)
        }
    }


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



    @Put()
    async selectCategrys(
        @Body() arrays:CategoryProductDto
    ):Promise<Product[]>{
        try {
            return await this.productsService.selectCategrys(arrays)
        } catch (error) {
            if(error instanceof HttpException)throw error
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }
}