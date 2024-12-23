import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from 'uuid'
import { Credential } from "../auth/credential.entity";
import { Order } from "../orders/order.entity";

@Entity({
    name:'users'
})
export class User{
    @PrimaryGeneratedColumn('uuid')
    id:string = uuid()

    @OneToOne(() => Credential, (Credential) => Credential.user)
    @JoinColumn()
    credential:Credential

    @Column()
    name: string;

    @Column()
    address: string;

    @Column()
    phone: string;

    @Column({default:false})
    isAdmin: boolean

    @Column({ nullable: true })
    country: string | undefined;

    @Column({ nullable: true })
    city: string | undefined;
  
    @OneToMany(()=>Order, (Order)=>Order.user)
    orders:Order[]

}