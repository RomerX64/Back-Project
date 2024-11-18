import { Body, Controller, Delete, Get, Headers, HttpException, HttpStatus, Param, Post, Put} from '@nestjs/common';
import ProductDto from 'src/dto/ProductDto';
import { ProductsDBService } from './productsDB.service';
import { Product } from './product.entity';


@Controller('products')
export class ProductController{
    constructor (private readonly productsService:ProductsDBService){}


    @Get()
    async getProducts():Promise<Product[]>{
        try {
            return await this.productsService.getProducts()
            
        } catch (error) {
            if(error instanceof HttpException)throw error
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }

    @Get(':id')
    async getProduct(@Param('id') id: string):Promise<Product>{
        try {
            return await this.productsService.getProduct(Number(id))
        } catch (error) {
            if(error instanceof HttpException)throw error
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }

    @Post()
    async newProduct( 
        @Body() newProductDta:ProductDto,
        @Headers('range') range: string
    ):Promise<Product>{
        try {
            if(range !== 'seller' && range !== 'admin')throw new HttpException('You do not have permission', HttpStatus.FORBIDDEN)

            return await this.productsService.newProduct(newProductDta)
        } catch (error) {
            if(error instanceof HttpException)throw error
            throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST)
        }
    }

    @Put(':id')
    async updateProduct(
        @Param('id') id: string,
        @Body() updateProductDta:ProductDto,
        @Headers('range') range: string
    ):Promise<Product>{
        try {
            if(range !== 'seller' && range !== 'admin')throw new HttpException('You do not have permission', HttpStatus.FORBIDDEN)
                if(!updateProductDta || Object.keys(updateProductDta).length === 0)throw new HttpException('No data provided to update', HttpStatus.NO_CONTENT)
                return await this.productsService.updateProduct(Number(id), updateProductDta)
        } catch (error) {
            if(error instanceof HttpException)throw error
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }

    @Delete(':id')
    async deleteProduct(
        @Param('id') id: string,
        @Headers('range') range: string
    ):Promise<Product>{
        try {
            if(range !== 'seller' && range !== 'admin')throw new HttpException('You do not have permission', HttpStatus.FORBIDDEN)
            return await this.productsService.deleteProduct(Number(id))
        } catch (error) {
            if(error instanceof HttpException)throw error
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }
}