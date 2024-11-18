import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrderRepository } from './orders.repository';
import { User } from '../users/User.entity';
import { Product } from '../products/product.entity';
import { Order } from './order.entity';
import { OrderDetail } from './orderDetail.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
    imports:[TypeOrmModule.forFeature([User, Product, Order, OrderDetail])],
    controllers: [OrdersController],
    providers: [OrdersService, OrderRepository],
})

export class OrderModule{}