import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import ProductDto from 'src/dto/ProductDto';
import IProduct from 'src/entities/IProduct';


@Injectable()
export class ProductsRepository{
    private products:IProduct[] = [
        {
            id: 1,
            name: "Smartphone X1000",
            description: "Smartphone de última generación con cámara de 108 MP y 128 GB de almacenamiento.",
            price: 799.99,
            stock: true,
            imgUrl: "https://example.com/images/smartphone-x1000.jpg"
          },
          {
            id: 2,
            name: "Laptop Pro 15",
            description: "Laptop profesional con pantalla de 15 pulgadas, procesador i7 y 16 GB de RAM.",
            price: 1299.99,
            stock: true,
            imgUrl: "https://example.com/images/laptop-pro-15.jpg"
          },
          {
            id: 3,
            name: "Cámara Digital Z500",
            description: "Cámara digital con lentes intercambiables y grabación en 4K.",
            price: 599.99,
            stock: false,
            imgUrl: "https://example.com/images/camera-z500.jpg"
          },
          {
            id: 4,
            name: "Auriculares Inalámbricos",
            description: "Auriculares Bluetooth con cancelación de ruido y 20 horas de autonomía.",
            price: 149.99,
            stock: true,
            imgUrl: "https://example.com/images/auriculares.jpg"
          },
          {
            id: 5,
            name: "Reloj Inteligente Q2",
            description: "Reloj inteligente con monitor de ritmo cardíaco y seguimiento de actividad física.",
            price: 199.99,
            stock: true,
            imgUrl: "https://example.com/images/reloj-q2.jpg"
          }
    ]
    async getProducts():Promise<IProduct[]>{
      try {
        return this.products;

      } catch (error) {
        throw error
      }  
    }

    async getProduct(id:number):Promise<IProduct>{
      try {

        const product = this.products.find(product => product.id === id)

        if(!product)throw new HttpException('Product not found', HttpStatus.NOT_FOUND)

        return product 

      } catch (error) {

        throw error
      }
    }

    async newProduct(newProductDta:ProductDto):Promise<IProduct>{
      try {
        const product ={
          id: this.products.length +1,
          ...newProductDta
        }
        if(!product) throw new HttpException('We could not create the product', HttpStatus.BAD_REQUEST)
          this.products.push(product)
        return product
      } catch (error) {
        if(error instanceof HttpException)throw error
        throw new HttpException(error, HttpStatus.CONFLICT);
      }
    }

    async updateProduct(id:number, updateProductDta:ProductDto):Promise<IProduct>{
      try {
        const product = this.getProduct(id)
        if(!product)throw new HttpException('Product not found', HttpStatus.NOT_FOUND)
        this.products.filter(product => product.id !== id)  
        return Object.assign(product, updateProductDta)
       
      
      } catch (error) {
        if(error instanceof HttpException)throw error
        throw new HttpException(error, HttpStatus.CONFLICT);
      }
    }

    async deleteProduct(id:number):Promise<IProduct>{
      try {
        const p = this.getProduct(id)
        if(!p)throw new HttpException('Product not found', HttpStatus.NOT_FOUND)
        this.products = this.products.filter(product => product.id !== id)
        return p
      } catch (error) {
        throw error
      }
    }
}