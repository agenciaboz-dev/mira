import { createContext, useState } from "react"
import React from "react"
import { Product } from "../definitions/product"

interface CartContextValue {
    value: Product[]
    setValue: (value: Product[]) => void
}

interface CartProviderProps {
    children: React.ReactNode
}

const CartContext = createContext<CartContextValue>({} as CartContextValue)

export default CartContext

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [value, setValue] = useState<Product[]>([])

    return <CartContext.Provider value={{ value, setValue }}>{children}</CartContext.Provider>
}
