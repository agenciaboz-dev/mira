import { Product } from "./product"
import { User } from "./user"

export interface Cart extends Product {
    quantity: number
}

export interface Order {
    id: number
    products: Cart[]
    status: number
    user: User
}
