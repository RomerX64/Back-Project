import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import IProduct from 'src/interfaces/IProduct';
import ProductDto from 'src/dto/ProductDto';


@Injectable()
export class ProductsService{
    constructor(
        private productsRepository:ProductsRepository
    ) {}

    async getProducts():Promise<IProduct[]>{
        try {
            return await this.productsRepository.getProducts()
            
        } catch (error) {
            throw error
        }
    }

    async getProduct(id:number):Promise<IProduct>{
        try {
            return await this.productsRepository.getProduct(id)
        } catch (error) {
            throw error
        }
    }

    async newProduct(newProductDta:ProductDto):Promise<IProduct>{
        try {
            return await this.productsRepository.newProduct(newProductDta)
        } catch (error) {
            throw error
        }
    }
    async updateProduct(id:number, updateProductDta:ProductDto):Promise<IProduct>{
        try {
            return this.productsRepository.updateProduct(id, updateProductDta)
        } catch (error) {
            throw error
        }
    }

    async deleteProduct(id:number):Promise<IProduct>{
        try {
            return this.productsRepository.deleteProduct(id)
        } catch (error) {
            throw error
        }
    }
}