import { Injectable } from '@nestjs/common';
import { OrderRepository } from './orders.repository';
import IOrder from 'src/entities/IOrder';
import OrderDto from 'src/dto/OrderDto';



@Injectable()
export class OrdersService {
    constructor (
        private orderRepository: OrderRepository
    ){}
    async getOrders():Promise<IOrder[]> {
        try {
            return this.orderRepository.getOrders()
        } catch (error) {
            throw error
        }
    }

    async getOrder(orderId:number, userId:number):Promise<IOrder>{
        try {
            return this.orderRepository.getOrder(orderId, userId)
        } catch (error) {
            throw error
        }
    }

    async newOrder(newOrderDta:OrderDto, userId:number):Promise<IOrder>{
        try {
            return this.orderRepository.newOrder(newOrderDta, userId)
        } catch (error) {
            throw error
        }
    }

    async updateOrder(orderId:number, productToUpdate:OrderDto, userId:number):Promise<IOrder>{
        try {
            return this.orderRepository.updateOrder(orderId,productToUpdate, userId)
        } catch (error) {
            throw error
        }
    }

    async deleteOrder(userId:number, orderId:number):Promise<IOrder>{
        try {
            return this.orderRepository.deleteOrder(userId, orderId)
        } catch (error) {
            throw error
        }
    }
}