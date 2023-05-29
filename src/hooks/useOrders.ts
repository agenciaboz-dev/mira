import { useContext } from "react"
import OrdersContext from "../contexts/ordersContext"
import { Cart, Order } from "../definitions/cart"
import { User } from "../definitions/user"

export const useOrders = () => {
    const ordersContext = useContext(OrdersContext)
    const orders = ordersContext.value
    const setOrders = ordersContext.setValue

    const newOrder = (order: Order) => {
        setOrders([...orders, order])
    }

    return { orders, setOrders, newOrder }
}
