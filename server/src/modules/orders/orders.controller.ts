import { Body, Controller, Delete, Get, Headers, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { OrdersService } from './orders.service';
import IOrder from 'src/entities/IOrder';
import OrderDto from 'src/dto/OrderDto';



@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService:OrdersService){}
    @Get()
    async getOrders():Promise<IOrder[]>{
        try {
            return this.ordersService.getOrders()
        } catch (error) {
            if(error instanceof HttpException)throw error
            throw new HttpException(error, HttpStatus.CONFLICT)
        }
    }

    @Get(':orderId')
    async getOrder(
        @Param('orderId') orderId:string,
        @Headers('token') token:string,
        @Headers('userId') userId:string,
    ):Promise<IOrder>{
        try {
            if(!token)throw new HttpException('You do not have permission', HttpStatus.FORBIDDEN)
            if(!userId)throw new HttpException('You did not loged', HttpStatus.BAD_REQUEST)    

            return this.ordersService.getOrder(Number(orderId), Number(userId))
        } catch (error) {
            if(error instanceof HttpException)throw error
            throw new HttpException(error, HttpStatus.CONFLICT)
        }
    }

    @Post()
    async newOrder(
        @Body() newOrderDta:OrderDto,
        @Headers('token') token:string,
        @Headers('userId') userId:string,
    ):Promise<IOrder>{
        try {
            if(!token)throw new HttpException('You do not have permission', HttpStatus.FORBIDDEN)
            if(!userId)throw new HttpException('You did not loged', HttpStatus.BAD_REQUEST)
            
            return this.ordersService.newOrder(newOrderDta,Number(userId))
    
        } catch (error) {
            if(error instanceof HttpException)throw error
            throw new HttpException(error, HttpStatus.CONFLICT)
        }
    }

    @Put(':orderId')
    async updateOrder(
        @Param('orderId') orderId:string,
        @Body() productToUpdate:OrderDto,
        @Headers('token') token:string,
        @Headers('userId') userId:string,
    ):Promise<IOrder>{
        try {
            if(!token)throw new HttpException('You do not have permission', HttpStatus.FORBIDDEN)
            if(!userId)throw new HttpException('You did not loged', HttpStatus.BAD_REQUEST)
            if(!orderId)throw new HttpException('You must select only one order', HttpStatus.BAD_REQUEST)
            if(!productToUpdate || Object.keys(productToUpdate).length === 0)throw new HttpException('No data provided to update', HttpStatus.NO_CONTENT)

                
            return this.ordersService.updateOrder(Number(orderId), productToUpdate, Number(userId))
        } catch (error) {
            if(error instanceof HttpException)throw error
            throw new HttpException(error, HttpStatus.CONFLICT)
        }
    }

    @Delete(':orderId')
    async deleteOrder(
        @Param('orderId') orderId:string,
        @Headers('token') token:string,
        @Headers('userId') userId:string,

    ):Promise<IOrder>{
        try {
            if(!token)throw new HttpException('You do not have permission', HttpStatus.FORBIDDEN)
            if(!userId)throw new HttpException('You did not loged', HttpStatus.BAD_REQUEST)
            if(!orderId)throw new HttpException('You must select only one order', HttpStatus.BAD_REQUEST)
            
            return this.ordersService.deleteOrder(Number(userId), Number(orderId))

        } catch (error) {
            if(error instanceof HttpException)throw error
            throw new HttpException(error, HttpStatus.CONFLICT)
        }
    }
}