import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from 'uuid'
import { User } from "../users/User.entity";

@Entity({
    name:'credentials'
})
export class Credential{
    @PrimaryGeneratedColumn('uuid')
    id:string = uuid()

    @Column()
    email:string

    @Column()
    password:string

    @OneToOne(() => User, (User)=> User.credential, {cascade:true})
    @JoinColumn({ name: 'userId' })
    user:User
    

}