import { useContext, useMemo } from "react"
import CartContext from "../contexts/cartContext"

export const useCart = () => {
    const cartContext = useContext(CartContext)

    const total = useMemo(() => {
        return cartContext.value.reduce((total, product) => {
            return total + product.price * product.quantity
        }, 0)
    }, cartContext.value)

    return { cart: cartContext.value, setCart: cartContext.setValue, total }
}
