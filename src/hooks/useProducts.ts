import { useContext } from "react"
import ProductsContext from "../contexts/productsContext"

export const useProducts = () => {
    const productsContext = useContext(ProductsContext)
    const products = productsContext.value

    const find = (id: number | string) => {
        const product_list = products.filter((product) => product.id == id)
        if (product_list.length == 0) return null

        return product_list[0]
    }

    return { products, setProducts: productsContext.setValue, refresh: productsContext.refresh, find }
}
