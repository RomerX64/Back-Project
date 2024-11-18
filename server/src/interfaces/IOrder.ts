import IProduct from "./IProduct"


interface IOrder {
    id:number,
    products: IProduct[]
    amount: number,
    userId: number
}
export default IOrder