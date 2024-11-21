import { Body, Controller, Delete, Get, Headers, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { OrderDBService } from './orderDB.service';
import { Order } from './order.entity';
import { OrderDetail } from './orderDetail.entity';



@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService:OrderDBService){}
    @Get()
    async getOrders(
        @Headers('userId') userId:string
    ):Promise<Order[]>{
        try {
            if(!userId)throw new HttpException('You did not loged', HttpStatus.UNAUTHORIZED)
            return await this.ordersService.getOrders(userId)
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
    ):Promise<Order>{
        try {
            if(!token)throw new HttpException('You do not have permission', HttpStatus.FORBIDDEN)
            if(!userId)throw new HttpException('You did not loged', HttpStatus.BAD_REQUEST)    

            return await this.ordersService.getOrder(Number(orderId), userId)
        } catch (error) {
            if(error instanceof HttpException)throw error
            throw new HttpException(error, HttpStatus.CONFLICT)
        }
    }

    @Post()
    async newDetail(
        @Body() productsIds:any,
        @Headers('token') token:string,
        @Headers('userId') userId:string,
    ):Promise<Order>{
        try {
            
            if(!token)throw new HttpException('You do not have permission', HttpStatus.FORBIDDEN)
            if(!userId)throw new HttpException('You did not loged', HttpStatus.BAD_REQUEST)
            if(!productsIds || productsIds.productsIds.length === 0) throw new HttpException('No product IDs provided', HttpStatus.NO_CONTENT)
            
            return await this.ordersService.newDetail(productsIds.productsIds, userId)
    
        } catch (error) {
            if(error instanceof HttpException)throw error
            throw new HttpException(error, HttpStatus.CONFLICT)
        }
    }

    @Put(':detailId')
    async updateOrder(
        @Param('detailId') detailId:string,
        @Body() productsIds:number[],
        @Headers('token') token:string,
        @Headers('userId') userId:string,
    ):Promise<OrderDetail>{
        try {
            if(!token)throw new HttpException('You do not have permission', HttpStatus.FORBIDDEN)
            if(!userId)throw new HttpException('You did not loged', HttpStatus.BAD_REQUEST)
            if(!detailId)throw new HttpException('You must select only one order', HttpStatus.BAD_REQUEST)
            if(!productsIds || Object.keys(productsIds).length === 0)throw new HttpException('No data provided to update', HttpStatus.NO_CONTENT)

                
            return await this.ordersService.updateOrder(productsIds, detailId)
        } catch (error) {
            if(error instanceof HttpException)throw error
            throw error
        }
    }

    @Delete(':orderId')
    async deleteOrder(
        @Param('orderId') orderId:string,
        @Headers('token') token:string,
        @Headers('userId') userId:string,
        @Headers('range') range:string,
        @Body() password:string

    ):Promise<Order>{
        try {
            if(!token)throw new HttpException('You do not have permission', HttpStatus.FORBIDDEN)
            if(!userId)throw new HttpException('You did not loged', HttpStatus.BAD_REQUEST)
            if(!orderId)throw new HttpException('You must select only one order', HttpStatus.BAD_REQUEST)
            
            return await this.ordersService.deleteOrder(userId, Number(orderId), password, range)

        } catch (error) {
            if(error instanceof HttpException)throw error
            throw new HttpException(error, HttpStatus.CONFLICT)
        }
    }

}