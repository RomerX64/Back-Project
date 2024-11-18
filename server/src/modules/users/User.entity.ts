import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import {v4 as uuid} from 'uuid'

@Entity({
    name:'users'
})
export class User{
    @PrimaryGeneratedColumn('uuid')
    id:string = uuid()

    @Column()
    name: string;

    @Column()
    address: string;

    @Column()
    phone: string;

    @Column({ nullable: true })
    country: string | undefined;
  
    @Column({ nullable: true })
    city: string | undefined;
  
    @Column()
    credentialID: number;

}