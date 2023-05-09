import { Product } from "./product"

export interface Cart extends Product {
    quantity: number
}
