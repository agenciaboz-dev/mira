import { useContext } from "react"
import ProductsContext from "../contexts/productsContext"

export const useProducts = () => {
    const productsContext = useContext(ProductsContext)
    const products = productsContext.value

    const find = (id: number | string) => {
        return products.filter((product) => product.id == id)[0]
    }

    return { products, setProducts: productsContext.setValue, refresh: productsContext.refresh, find }
}
