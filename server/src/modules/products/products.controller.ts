import { Controller, Get} from '@nestjs/common';
import { ProductsService } from './products.service';


@Controller('products')
export class ProductController{
    constructor (private readonly productsService:ProductsService){}

    @Get()
    getProducts(){
        return this.productsService.getProducts()
    }

}