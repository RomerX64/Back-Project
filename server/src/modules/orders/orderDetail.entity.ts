import { Column, Entity, JoinColumn, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";
import { Product } from "../products/product.entity";
import {v4 as uuid} from 'uuid'

@Entity({
    name:'orderDetails'
})
export class OrderDetail{
    @PrimaryGeneratedColumn('uuid')
    id:string = uuid()

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: false
    })
    price:number

    @OneToOne(()=>Order, (Order) => Order.id)
    @JoinColumn()
    orderId:Order

    @ManyToMany(()=>Product,(product) => product.id)
    @JoinColumn()
    products:Product[]
}