import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";


@Entity({
    name:'categories'
})
export class Category{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string

    @ManyToMany(()=>Product, (Product) => Product.categories)
    products:Product[]
}