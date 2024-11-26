import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards } from "@nestjs/common";
import { Category } from "./categorys.entity";
import { ProductsDBService } from "./productsDB.service";
import { Product } from "./product.entity";
import CategoryProductDto from "../../dto/CategoryProductDto";
import { RolesGuard } from "../../guards/roles.guard";
import { Roles } from "../../decorators/roles.decorator";
import { Role } from "../auth/roles.enum";
import { AuthGuard } from "../../guards/auth.guard";
import { ApiBearerAuth } from "@nestjs/swagger";


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

    @ApiBearerAuth()
    @Post()
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
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

    @ApiBearerAuth()
    @Post(':name')
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
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


    @ApiBearerAuth()
    @Put()
    @Roles(Role.Admin)
    @UseGuards(AuthGuard, RolesGuard)
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