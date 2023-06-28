import { Product } from "./product"
import { Address, User } from "./user"

export interface Cart extends Product {
    quantity: number
}

interface orderProduct {
    quantity: number
    product: Product
}

export interface Order {
    id?: number
    products: orderProduct[]
    delivery?: boolean
    status?: number
    user?: User
    address?: Address
    total?: number
    review: boolean
    quotation?: any
}
