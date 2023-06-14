import { Product } from "./product"
import { Address, User } from "./user"

export interface Cart extends Product {
    quantity: number
}

export interface Order {
    id?: number
    products?: Cart[]
    delivery?: boolean
    status?: number
    user?: User
    address?: Address
    total?: number
    quotation?: any
}
