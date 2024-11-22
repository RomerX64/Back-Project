import { Body, Controller, Delete, Get, Headers, HttpException, HttpStatus, Param, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common';
import { OrderDBService } from './orderDB.service';
import { Order } from './order.entity';
import { OrderDetail } from './orderDetail.entity';
import { AuthGuard } from 'src/guards/auth.guard';



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
    @UseGuards(AuthGuard)
    async getOrder(
        @Param('orderId') orderId:string,
        @Headers('userId') userId:string,
    ):Promise<Order>{
        try {
            if(!userId)throw new HttpException('You did not loged', HttpStatus.BAD_REQUEST)    

            return await this.ordersService.getOrder(Number(orderId), userId)
        } catch (error) {
            if(error instanceof HttpException)throw error
            throw new HttpException(error, HttpStatus.CONFLICT)
        }
    }

    @Post()
    @UseGuards(AuthGuard)
    async newDetail(
        @Body() productsIds:number[],
        @Headers('userId') userId:string,
    ):Promise<Order>{
        try {
            
            if(!userId)throw new HttpException('You did not loged', HttpStatus.BAD_REQUEST)
            if(!productsIds || productsIds.length === 0) throw new HttpException('No product IDs provided', HttpStatus.NO_CONTENT)
            
            return await this.ordersService.newDetail(productsIds, userId)
    
        } catch (error) {
            if(error instanceof HttpException)throw error
            throw new HttpException(error, HttpStatus.CONFLICT)
        }
    }

    @Put(':detailId')
    @UseGuards(AuthGuard)
    async updateOrder(
        @Param('detailId', ParseUUIDPipe) detailId:string,
        @Body() productsIds:number[],
        @Headers('userId') userId:string,
    ):Promise<OrderDetail>{
        try {
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
    @UseGuards(AuthGuard)
    async deleteOrder(
        @Param('orderId') orderId:string,
        @Headers('userId') userId:string,
    ):Promise<Order>{
        try {
            if(!userId)throw new HttpException('You did not loged', HttpStatus.BAD_REQUEST)
            if(!orderId)throw new HttpException('You must select only one order', HttpStatus.BAD_REQUEST)
            
            return await this.ordersService.deleteOrder(userId, Number(orderId))

        } catch (error) {
            if(error instanceof HttpException)throw error
            throw new HttpException(error, HttpStatus.CONFLICT)
        }
    }

}