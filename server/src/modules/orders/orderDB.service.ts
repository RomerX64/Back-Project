import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { Order } from "./order.entity";
import { OrderDetail } from "./orderDetail.entity";
import { User } from "../users/User.entity";
import { Product } from "../products/product.entity";



@Injectable()
export class OrderDBService{
    constructor(
        @InjectRepository(Order) private orderRepository:Repository<Order>,
        @InjectRepository(User) private userRepository:Repository<User>,
        @InjectRepository(OrderDetail) private detailRepository:Repository<OrderDetail>,
        @InjectRepository(Product) private productRepository:Repository<Product>,
        

    ){}

    async getOrder(orderId:number,userId:string):Promise<Order>{
        try {
            const o:Order|undefined = await this.orderRepository.findOne({where:{id:orderId}})
            if(!o)throw new HttpException('Order not found', HttpStatus.NOT_FOUND)
            if(o.user.id !== userId)throw new HttpException('This order is not you propety', HttpStatus.NOT_ACCEPTABLE)
            return o
            } catch (error) {
            throw error
        }
    }

    async getOrders(userId:string):Promise<Order[]>{
        try {
            const O:Order[]|undefined = await this.orderRepository.find({where:{user:{ id: userId}}})
            if(!O)throw new HttpException('Orers not found', HttpStatus.NOT_FOUND)
            return O
        } catch (error) {
            throw error
        }
    }

    async newOrder(OrderDetail:OrderDetail, userId:string):Promise<Order>{
        try {
            const e:Order|undefined = await this.orderRepository.findOne({where:{detail:{id:OrderDetail.id}}, relations:['detail']})
            if(e)throw new HttpException('These details are already linked to another order.', HttpStatus.CONFLICT)
            
            const user:User|undefined = await this.userRepository.findOne({where:{id:userId}})
            if(!user) throw new HttpException('User Not Found', HttpStatus.NOT_FOUND)
            
            const newOrder ={
                user,
                detail:OrderDetail,
                date:new Date()
            }
            const o:Order|undefined = await this.orderRepository.create(newOrder)
            if(!o)throw new HttpException('Error to make your order', HttpStatus.NOT_IMPLEMENTED)
            return await this.orderRepository.save(o)
        } catch (error) {
            throw error    
        }
    }

    getAmount(products:Product[]):number{
        let count = 0 
        products.map(p=> count = p.price + count )
        return count
    }
    
    async newDetail(productsIds:number[], userId:string):Promise<Order>{

        const P:Product[] = await this.productRepository.find({where:{id:In(productsIds)}})
        if(!P)throw new HttpException('Products not found', HttpStatus.NOT_FOUND)

        const newDetail = {
            price:this.getAmount(P),
            products:P
        }
        const d:OrderDetail = await this.detailRepository.create(newDetail)
        const OrderDetail:OrderDetail = await this.detailRepository.save(d)
        return await this.newOrder(OrderDetail, userId)

    }

    async updateOrder(productsIds:number[],detailId:string):Promise<OrderDetail>{
        try {
            const d:OrderDetail = await this.detailRepository.findOne({where:{id:detailId}})
            if(!d)throw new HttpException('Order details not found', HttpStatus.NOT_FOUND)

            const P:Product[] = await this.productRepository.find({where:{id:In(productsIds)}})
            if(!P)throw new HttpException('Products not found', HttpStatus.NOT_FOUND)
            
            const arr:Product[] = [... d.products, ...P]
            d.products = arr.filter((objeto, index, self) => 
                self.findIndex(o => o.id === objeto.id) === index
            )
            d.price = this.getAmount(d.products)
            return await this.detailRepository.save(d)

        } catch (error) {
            throw error
        }
    }

    async deleteOrder(userId:string, orderId:number, password:string, range:string):Promise<Order>{
        try {
            const o:Order|undefined = await this.orderRepository.findOne({where:{id:orderId}})
            if(!o)throw new HttpException('Order not found', HttpStatus.NOT_FOUND)
            if(range !== 'admin' && o.user.id !== userId)throw new HttpException('This order is not your propety', HttpStatus.NOT_ACCEPTABLE)
            if(range !== 'admin' && o.user.credential.password !== password )throw new HttpException('Invalid credential',HttpStatus.UNAUTHORIZED)
            return await this.orderRepository.remove(o)
        } catch (error) {
            throw error
        }
    }
    
}