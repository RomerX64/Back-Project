import { Module } from '@nestjs/common';
import { ProductController } from './products.controller';
import { Order } from '../orders/order.entity';
import { Product } from './product.entity';
import { Category } from './categorys.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsDBService } from './productsDB.service';


@Module({
    imports:[TypeOrmModule.forFeature([Order, Product, Category])],
    providers:[ProductsDBService],
    controllers:[ProductController]
})

export class ProductModule {}