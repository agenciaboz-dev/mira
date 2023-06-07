import { useContext } from "react"
import OrderContext from "../contexts/orderContext"
import { Cart, Order } from "../definitions/cart"
import { User } from "../definitions/user"

export const useOrder = () => {
    const orderContext = useContext(OrderContext)
    const order = orderContext.value
    const setOrder = orderContext.setValue

    return { order: order, setOrder: setOrder }
}
