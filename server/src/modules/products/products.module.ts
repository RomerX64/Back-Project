import { Module } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { ProductController } from './products.controller';
import { ProductsService } from './products.service';
import { Order } from '../orders/order.entity';
import { Product } from './product.entity';
import { Category } from './categorys.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
    imports:[TypeOrmModule.forFeature([Order, Product, Category])],
    providers:[ProductsRepository, ProductsService],
    controllers:[ProductController]
})

export class ProductModule {}