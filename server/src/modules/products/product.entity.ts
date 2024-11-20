import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./categorys.entity";
import { OrderDetail } from "../orders/orderDetail.entity";


@Entity({
    name:'products'
})
export class Product{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string

    @Column()
    description:string

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price:number

    @Column()
    stock:number

    @Column()
    imgUrl:string

    @ManyToMany(()=>Category,(Category)=> Category.id)
    categories:Category[]

    @ManyToMany(()=>OrderDetail,(OrderDetail) => OrderDetail.id)
    orders:OrderDetail[]
}