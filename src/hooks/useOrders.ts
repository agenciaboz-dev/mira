import { useContext } from "react"
import OrdersContext from "../contexts/ordersContext"

export const useOrders = () => {
    const ordersContext = useContext(OrdersContext)
    const orders = ordersContext.value
    const setOrders = ordersContext.setValue

    return { orders, setOrders, ...ordersContext }
}
