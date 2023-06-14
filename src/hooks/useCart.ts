import { useContext, useMemo } from "react"
import CartContext from "../contexts/cartContext"
import { Product } from "../definitions/product"

export const useCart = () => {
    const cartContext = useContext(CartContext)
    const cart = cartContext.value
    const setCart = cartContext.setValue

    const total = useMemo(() => {
        return cart.reduce((total, product) => {
            return total + product.price * product.quantity
        }, 0)
    }, [cart])

    const add = (product: Product, quantity: number = 1) => {
        setCart([...cart, { ...product, quantity }])
    }

    const isInCart = (product: Product) => {
        const products = cart.filter((item) => item.id == product.id)

        if (products.length > 0) {
            return true
        }
    }

    const empty = () => {
        setCart([])
    }

    return { cart, setCart, total, add, isInCart, empty }
}
