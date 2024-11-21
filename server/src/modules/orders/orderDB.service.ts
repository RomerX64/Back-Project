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
            console.log(orderId)
            console.log(typeof orderId)
            console.log(userId)
            console.log(typeof userId)

            const user:User = await this.userRepository.findOne({ where: { id: userId }, relations: ['orders'] });
            if (!user)throw new HttpException('User not found', HttpStatus.NOT_FOUND);
            console.log(user)
            const o:Order|undefined = await this.orderRepository.findOne({where:{id:orderId}, relations:['user']})
            if(!o)throw new HttpException('Order not found', HttpStatus.NOT_FOUND)
                console.log(o.user.id)
            if(o.user.id !== userId)throw new HttpException('This order is not you propety', HttpStatus.NOT_ACCEPTABLE)
            console.log(o)

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

    getAmount(products:Product[]):number{
        let count = 0 
        products.map(p=> count = count + Number(p.price) )
        return count
    }
    
    async newDetail(productsIds: number[], userId: string): Promise<Order> {
        try {
            const user:User = await this.userRepository.findOne({ where: { id: userId } });
            if (!user)throw new HttpException('User not found', HttpStatus.NOT_FOUND);

            const productIdsAsNumbers = productsIds.map(id => Number(id));
            const products:Product[] = await this.productRepository.find({where:{id: In(productIdsAsNumbers)}})
            if (products.length === 0) throw new HttpException('Products not found', HttpStatus.NOT_FOUND);
            const arrProducts: Product[] = products.map(p => {
                p.price = Number(p.price); 
                return p; 
            });

            const newDetail:OrderDetail = this.detailRepository.create({
                price: this.getAmount(arrProducts),
                products: arrProducts,
            });
            await this.detailRepository.save(newDetail)

            const newOrder:Order = this.orderRepository.create({
                date:new Date(),
                user:user,
                detail:newDetail
            })
            if (!newOrder) throw new HttpException('Error creating order', HttpStatus.NOT_IMPLEMENTED);
            await this.orderRepository.save(newOrder);
            return newOrder
        } catch (error) {
            throw error;  
        }
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