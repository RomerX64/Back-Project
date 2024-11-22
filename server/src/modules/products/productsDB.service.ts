import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./product.entity";
import { In, Repository } from "typeorm";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import ProductDto from "../../dto/ProductDto";
import { Category } from "./categorys.entity";
import CategoryProductDto from "../../dto/CategoryProductDto";


@Injectable()
export class ProductsDBService{
    constructor(
        @InjectRepository(Product) private productsRepository:Repository<Product>,
        @InjectRepository(Category) private categoryRepository:Repository<Category>
    ){}

    async getProduct(id:number):Promise<Product>{
        try {
            console.log(id)
            const p = await this.productsRepository.findOne({
                where:{id}
            })
            console.log(p)
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
            })
            

            const e: Product[] | undefined = await this.productsRepository.find({where: { name: In(newProductsDta.map((product) => product.name))}});
            if (e.length > 0) {
                throw new HttpException({
                    statusCode: HttpStatus.CONFLICT, 
                    message: 'Productos ya existentes',
                    existingProducts: e,
                }, HttpStatus.CONFLICT);
            }            
                
            return await Promise.all(
                fixed.map(async (product) => {
                return await this.productsRepository.save(product);
            }));
           
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

    async newCategorys(names:string[]):Promise<Category[]>{
        try {
            const e: Category[]|undefined = await this.categoryRepository.find({where:{name:In(names)}})
            if (e.length > 0) {
                throw new HttpException({
                    statusCode: HttpStatus.CONFLICT, 
                    message: 'Productos ya existentes',
                    existingProducts: e,
                }, HttpStatus.CONFLICT);
            }
            const newCategories = names.map(name => {
                const category = new Category();
                category.name = name;  
                return category;
            });
    
            return await this.categoryRepository.save(newCategories);        
            } catch (error) {
            throw error
        }
    }

    async getCategories():Promise<Category[]>{
        try {
            return await this.categoryRepository.find()
        } catch (error) {
            throw error
        }
    }

    async selectCategrys(arrays:CategoryProductDto):Promise<Product[]>{
        try {
            const {products, categories} = arrays

            const c = await this.categoryRepository.find({where:{id:In(categories)}})
            if(!c)throw new HttpException('Categories not found', HttpStatus.NOT_FOUND)

            const p:Product[] = await this.productsRepository.find({where:{id:In(products)}, relations:['categories']})
            if(!p)throw new HttpException('Products not found', HttpStatus.NOT_FOUND)


            const updatedProducts = p.map((product) => {
                product.categories = [...product.categories , ... c]
                console.log(product)
                console.log(product.categories)
                return product;
            });

            return await this.productsRepository.save(updatedProducts);
        } catch (error) {
            throw error
        }
    }

}