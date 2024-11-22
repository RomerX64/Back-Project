import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards} from '@nestjs/common';
import ProductDto from 'src/dto/ProductDto';
import { ProductsDBService } from './productsDB.service';
import { Product } from './product.entity';
import { RolesGuard } from 'src/guards/roles.guard';
import { AuthGuard } from 'src/guards/auth.guard';


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
            console.log(id)
            return await this.productsService.getProduct(Number(id))
        } catch (error) {
            if(error instanceof HttpException)throw error
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }

    @Post()
    @UseGuards(AuthGuard, RolesGuard)
    async newProduct( 
        @Body() newProductDta:ProductDto,
    ):Promise<Product>{
        try {

            return await this.productsService.newProduct(newProductDta)
        } catch (error) {
            if(error instanceof HttpException)throw error
            throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST)
        }
    }

    @Post('varios')
    @UseGuards(AuthGuard, RolesGuard)
    async newProducts(
        @Body() newProdutctsDta:ProductDto[],
    ):Promise<Product[]>{
        try {
            if(!newProdutctsDta || newProdutctsDta.length === 0)throw new HttpException('No data provided', HttpStatus.NO_CONTENT)
            return await this.productsService.newProducts(newProdutctsDta)
        } catch (error) {
            if(error instanceof HttpException)throw error
            throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST)
        }
    }

    @Put(':id')
    @UseGuards(AuthGuard, RolesGuard)
    async updateProduct(
        @Param('id') id: string,
        @Body() updateProductDta:ProductDto,
    ):Promise<Product>{
        try {
                if(!updateProductDta || Object.keys(updateProductDta).length === 0)throw new HttpException('No data provided to update', HttpStatus.NO_CONTENT)
                return await this.productsService.updateProduct(Number(id), updateProductDta)
        } catch (error) {
            if(error instanceof HttpException)throw error
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }

    @Delete(':id')
    @UseGuards(AuthGuard, RolesGuard)
    async deleteProduct(
        @Param('id') id: string,
    ):Promise<Product>{
        try {
            return await this.productsService.deleteProduct(Number(id))
        } catch (error) {
            if(error instanceof HttpException)throw error
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }
}