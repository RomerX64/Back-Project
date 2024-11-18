import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../users/User.entity";
import { OrderDetail } from "./orderDetail.entity";


@Entity({
    name:'orders'
})
export class Order{
    @PrimaryGeneratedColumn()
    id:number

    @ManyToOne(() => User, (User) => User.id)
    @JoinColumn()
    userId:User
    
    @Column()
    date:Date

    @OneToOne(()=>OrderDetail, (OrderDetail)=>OrderDetail.orderId)
    @JoinColumn() 
    detail:OrderDetail

}