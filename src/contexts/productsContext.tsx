import { createContext, useState } from "react"
import React, { useEffect } from "react"
import { Product } from "../definitions/product"
import { products as mocked } from "../mocks/products"
import { useApi } from "../hooks/useApi"

interface ProductsContextValue {
    value: Product[]
    setValue: (value: Product[]) => void
    refresh: () => void
}

interface ProductsProviderProps {
    children: React.ReactNode
}

const ProductsContext = createContext<ProductsContextValue>({} as ProductsContextValue)

export default ProductsContext

export const ProductsProvider: React.FC<ProductsProviderProps> = ({ children }) => {
    const api = useApi()
    const [value, setValue] = useState<Product[]>([])

    const refresh = () => {
        api.products.get({ callback: (response: { data: Product[] }) => setValue(response.data) })
    }

    useEffect(() => {
        refresh()
    }, [])

    return <ProductsContext.Provider value={{ value, setValue, refresh }}>{children}</ProductsContext.Provider>
}
