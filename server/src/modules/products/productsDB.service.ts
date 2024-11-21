import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./product.entity";
import { In, Repository } from "typeorm";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import ProductDto from "src/dto/ProductDto";
import { Category } from "./categorys.entity";


@Injectable()
export class ProductsDBService{
    constructor(
        @InjectRepository(Product) private productsRepository:Repository<Product>,
        @InjectRepository(Category) private categoryRepository:Repository<Category>
    ){}

    async getProduct(id:number):Promise<Product>{
        try {
            const p = await this.productsRepository.findOne({
                where:{id},
                relations: ['category']
            })
            if(!p)throw new HttpException('Product not found', HttpStatus.NOT_FOUND)
            return p
        } catch (error) {
            throw error
        }
    }

    async getProducts():Promise<Product[]>{
        try {
            const ps = await this.productsRepository.find()
            if(!ps)throw new HttpException('Products not found', HttpStatus.NOT_FOUND)
            return ps
        } catch (error) {
            throw error
        }
    }

    async newProduct(newProductDta:ProductDto):Promise<Product>{
        try {
            const e = await this.productsRepository.findOne({where:{name:newProductDta.name}})
            if(e)throw new HttpException('Product already exists', HttpStatus.CONFLICT)
            if(!newProductDta.imgUrl)newProductDta.imgUrl = 'https://exaple.img/image'
            const p = this.productsRepository.create(newProductDta)
            return await this.productsRepository.save(p)
        } catch (error) {
            throw error
        }
    }

    async newProducts(newProductsDta:ProductDto[]):Promise<Product[]>{
        try {

            const fixed:ProductDto[] = newProductsDta.map(
                (p)=>{
                    if(!p.imgUrl)p.imgUrl = 'https://exaple.img/image'
                    return p
                } 
                )
            
                const e: Product[] | undefined = await this.productsRepository.find({
                    where: {
                        name: In(newProductsDta.map((product) => product.name)) // Extraer los nombres de los productos
                    }
                });

                if (e.length > 0) {
                    throw new HttpException({
                        statusCode: HttpStatus.CONFLICT, 
                        message: 'Productos ya existentes',
                        existingProducts: e,
                    }, HttpStatus.CONFLICT);
                }            return await Promise.all(
                fixed.map(async (product) => {
                    return await this.productsRepository.save(product);
                })
            );
           
        } catch (error) {
            throw error
        }
    }

    async updateProduct(id:number, updateProductDta:ProductDto):Promise<Product>{
        try {
            const p = await this.productsRepository.findOne({where:{id}})
            if(!p)throw new HttpException('Product not found', HttpStatus.NOT_FOUND)
            p.name = updateProductDta.name
            p.description = updateProductDta.description
            p.price = updateProductDta.price
            p.stock = updateProductDta.stock
            p.imgUrl = updateProductDta.imgUrl
            return await this.productsRepository.save(p)
        } catch (error) {
            throw error
        }
    }

    async deleteProduct(id:number):Promise<Product>{
        try {
            const p = await this.productsRepository.findOne({where:{id}})
            if(!p)throw new HttpException('Product not found', HttpStatus.NOT_FOUND)
            return await this.productsRepository.remove(p)
        } catch (error) {
            throw error
        }
    }

    async newCategory(name:string):Promise<Category>{
        try {
            const c = await this.categoryRepository.findOne({where:{name}})
            if(c)throw new HttpException('Category already exists', HttpStatus.CONFLICT)
            const category = this.categoryRepository.create({name})
            return await this.categoryRepository.save(category)
        } catch (error) {
            if(error instanceof HttpException)throw error
            throw new HttpException(error, HttpStatus.CONFLICT)
        }
    }

    async selectCategrys(ids:number[], productId:number):Promise<Product>{
        try {
            const product:Product|undefined = await this.productsRepository.findOne({where:{id:productId}})
            if(!product)throw new HttpException('Product not found', HttpStatus.NOT_FOUND)

            const categorys:Category[]|undefined = await this.categoryRepository.find({where:{id:In(ids)}})
            if(!categorys)throw new HttpException('Categorys not found',HttpStatus.NOT_FOUND)
            const arr = [... product.categories, ...categorys]
            product.categories = arr.filter((numero, index, self) => self.indexOf(numero) === self.lastIndexOf(numero))
            return await this.productsRepository.save(product)
        } catch (error) {
            throw error
        }
    }

}