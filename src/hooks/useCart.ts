import { useContext } from "react"
import CartContext from "../contexts/cartContext"

export const useCart = () => {
    const cartContext = useContext(CartContext)

    return { cart: cartContext.value, setCart: cartContext.setValue }
}
