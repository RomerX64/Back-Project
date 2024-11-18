import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import OrderDto from "src/dto/OrderDto";
import IOrder from "src/interfaces/IOrder";
import IProduct from "src/interfaces/IProduct";


@Injectable()
export class OrderRepository{
    private orders:IOrder[] = [ {
        id: 1,
        products: [
          { id: 1, name: "Laptop", description: "High-performance laptop", price: 1200, stock: true, imgUrl: "https://example.com/laptop.jpg" },
          { id: 2, name: "Phone", description: "Smartphone with great camera", price: 800, stock: true, imgUrl: "https://example.com/phone.jpg" },
        ],
        amount: 2000,
        userId: 1,
      },
      {
        id: 2,
        products: [
          { id: 3, name: "Headphones", description: "Noise-cancelling headphones", price: 200, stock: true, imgUrl: "https://example.com/headphones.jpg" },
          { id: 4, name: "Monitor", description: "4K Ultra HD monitor", price: 400, stock: true, imgUrl: "https://example.com/monitor.jpg" },
        ],
        amount: 600,
        userId: 2,
      },
      {
        id: 3,
        products: [
          { id: 5, name: "Keyboard", description: "Mechanical keyboard", price: 100, stock: true, imgUrl: "https://example.com/keyboard.jpg" },
          { id: 2, name: "Phone", description: "Smartphone with great camera", price: 800, stock: true, imgUrl: "https://example.com/phone.jpg" },
        ],
        amount: 900,
        userId: 3,
      },
      {
        id: 4,
        products: [
          { id: 1, name: "Laptop", description: "High-performance laptop", price: 1200, stock: true, imgUrl: "https://example.com/laptop.jpg" },
        ],
        amount: 1200,
        userId: 4,
      },
      {
        id: 5,
        products: [
          { id: 4, name: "Monitor", description: "4K Ultra HD monitor", price: 400, stock: true, imgUrl: "https://example.com/monitor.jpg" },
          { id: 3, name: "Headphones", description: "Noise-cancelling headphones", price: 200, stock: true, imgUrl: "https://example.com/headphones.jpg" },
        ],
        amount: 600,
        userId: 5,
      },
      {
        id: 6,
        products: [
          { id: 2, name: "Phone", description: "Smartphone with great camera", price: 800, stock: true, imgUrl: "https://example.com/phone.jpg" },
          { id: 3, name: "Headphones", description: "Noise-cancelling headphones", price: 200, stock: true, imgUrl: "https://example.com/headphones.jpg" },
          { id: 5, name: "Keyboard", description: "Mechanical keyboard", price: 100, stock: true, imgUrl: "https://example.com/keyboard.jpg" },
        ],
        amount: 1100,
        userId: 1,
      },
      {
        id: 7,
        products: [
          { id: 1, name: "Laptop", description: "High-performance laptop", price: 1200, stock: true, imgUrl: "https://example.com/laptop.jpg" },
          { id: 4, name: "Monitor", description: "4K Ultra HD monitor", price: 400, stock: true, imgUrl: "https://example.com/monitor.jpg" },
        ],
        amount: 1600,
        userId: 2,
      },
      {
        id: 8,
        products: [
          { id: 5, name: "Keyboard", description: "Mechanical keyboard", price: 100, stock: true, imgUrl: "https://example.com/keyboard.jpg" },
        ],
        amount: 100,
        userId: 3,
      },
      {
        id: 9,
        products: [
          { id: 3, name: "Headphones", description: "Noise-cancelling headphones", price: 200, stock: true, imgUrl: "https://example.com/headphones.jpg" },
          { id: 2, name: "Phone", description: "Smartphone with great camera", price: 800, stock: true, imgUrl: "https://example.com/phone.jpg" },
          { id: 4, name: "Monitor", description: "4K Ultra HD monitor", price: 400, stock: true, imgUrl: "https://example.com/monitor.jpg" },
        ],
        amount: 1400,
        userId: 4,
      },
      {
        id: 10,
        products: [
          { id: 1, name: "Laptop", description: "High-performance laptop", price: 1200, stock: true, imgUrl: "https://example.com/laptop.jpg" },
          { id: 5, name: "Keyboard", description: "Mechanical keyboard", price: 100, stock: true, imgUrl: "https://example.com/keyboard.jpg" },
        ],
        amount: 1300,
        userId: 5,
      },]

    async getOrders():Promise<IOrder[]>{
        try {
            return this.orders
        } catch (error) {
            if(error instanceof HttpException)throw error
            throw new HttpException(error, HttpStatus.BAD_REQUEST)
        }
    }

    async getOrder(orderId:number, userId:number):Promise<IOrder>{
        try {
            const order = this.orders.find(o=>o.id === orderId)
            if(!order)throw new HttpException('Order not found', HttpStatus.NOT_FOUND)
            if(order.userId !== userId)throw new HttpException('This order is not you propety', HttpStatus.NOT_ACCEPTABLE)
            return order
        } catch (error) {
            if(error instanceof HttpException)throw error
            throw new HttpException(error, HttpStatus.CONFLICT)
        }
    }

    async newOrder(newOrderDta:OrderDto, userId:number):Promise<IOrder>{
        try {
            const getAmount = (products:IProduct[]):number =>{
                let count = 0
                products.map(p => count = p.price + count  )
                return count
            }
            const order:IOrder = {
                id: this.orders.length + 1,
                products: newOrderDta.products,
                amount: getAmount(newOrderDta.products),
                userId,
            }
            if(!order)throw new HttpException('We can not create this order', HttpStatus.BAD_REQUEST)
                this.orders.push(order)
            return order
        } catch (error) {
            throw error
        }
    }

    async updateOrder(orderId:number,productToUpdate:OrderDto, userId:number):Promise<IOrder>{
        try {
            const getAmount = (products:IProduct[]):number =>{
                let count = 0
                products.map(p => count = p.price + count  )
                return count
            }
            const order = this.orders.find(o => o.id === orderId)
            if(!order)throw new HttpException('Order not found', HttpStatus.NOT_FOUND)
            if(order.userId !== userId) throw new HttpException('This order is not you propety', HttpStatus.NOT_ACCEPTABLE) 
            order.products = productToUpdate.products
            order.amount = getAmount(order.products)
            this.orders = this.orders.map(o => (o.id === orderId ? order : o));
            return order
        } catch (error) {
            throw error
        }
    }

    async deleteOrder(userId:number, orderId:number):Promise<IOrder>{
        try {
            const order = this.orders.find(o => o.id === orderId)
            if(!order)throw new HttpException('Order not found', HttpStatus.NOT_FOUND)
            if(order.userId !== userId) throw new HttpException('This order is not you propety', HttpStatus.NOT_ACCEPTABLE) 
            this.orders = this.orders.map(o => (o.id === orderId ? null : o))
            return order
            
        } catch (error) {
            throw error
        }

    }
}