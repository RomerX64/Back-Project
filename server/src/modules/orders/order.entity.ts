import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../users/User.entity";
import { OrderDetail } from "./orderDetail.entity";


@Entity({
    name:'orders'
})
export class Order{
    @PrimaryGeneratedColumn()
    id:number

    @ManyToOne(() => User, (User) => User.orders)
    user:User
    
    @Column()
    date:Date

    @OneToOne(()=>OrderDetail, (OrderDetail)=> OrderDetail.order, {cascade:true})
    @JoinColumn() 
    detail:OrderDetail

}