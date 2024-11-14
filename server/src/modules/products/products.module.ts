import { Module } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { ProductController } from './products.controller';
import { ProductsService } from './products.service';


@Module({
    providers:[ProductsRepository, ProductsService],
    controllers:[ProductController]
})

export class ProductModule {}