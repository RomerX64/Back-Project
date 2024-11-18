import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { User } from '../users/User.entity';
import { Product } from '../products/product.entity';
import { Order } from './order.entity';
import { OrderDetail } from './orderDetail.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderDBService } from './orderDB.service';


@Module({
    imports:[TypeOrmModule.forFeature([User, Product, Order, OrderDetail])],
    controllers: [OrdersController],
    providers: [OrderDBService],
})

export class OrderModule{}