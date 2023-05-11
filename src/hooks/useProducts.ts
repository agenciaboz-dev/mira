import { useContext } from "react"
import ProductsContext from "../contexts/productsContext"

export const useProducts = () => {
    const productsContext = useContext(ProductsContext)

    return { products: productsContext.value, setProducts: productsContext.setValue, refresh: productsContext.refresh }
}
