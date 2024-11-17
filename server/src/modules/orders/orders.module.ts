import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrderRepository } from './orders.repository';


@Module({
    controllers: [OrdersController],
    providers: [OrdersService, OrderRepository],
})

export class OrderModule{}