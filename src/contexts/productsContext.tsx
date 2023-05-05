import { createContext, useState } from "react"
import React from "react"
import { Product } from "../definitions/product"
import { products as mocked } from "../mocks/products"

interface ProductsContextValue {
    value: Product[]
    setValue: (value: Product[]) => void
}

interface ProductsProviderProps {
    children: React.ReactNode
}

const ProductsContext = createContext<ProductsContextValue>({} as ProductsContextValue)

export default ProductsContext

export const ProductsProvider: React.FC<ProductsProviderProps> = ({ children }) => {
    const [value, setValue] = useState<Product[]>([...mocked])

    return <ProductsContext.Provider value={{ value, setValue }}>{children}</ProductsContext.Provider>
}
