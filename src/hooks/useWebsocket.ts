import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket"
import { useOrders } from "./useOrders"
import { useNavigate } from "react-router-dom"
import { Cart } from "../definitions/cart"
import { User } from "../definitions/user"
import { useApi } from "./useApi"
import { useCart } from "./useCart"
import { useUser } from "./useUser"

export const useWebsocket = () => {
    const { orders, newOrder } = useOrders()
    const api = useApi()
    const navigate = useNavigate()
    const { cart } = useCart()
    const { user } = useUser()

    const { sendMessage, lastMessage, readyState } = useWebSocket("ws://localhost:4102", {
        onMessage: (message) => {
            const data = JSON.parse(message.data)
            console.log(data)

            if (data.paid) {
                newOrder(data.order)
                navigate("/checkout/finish")
            }
        },
    })

    const pay = () => {
        api.order.new({
            data: {
                products: cart,
                user,
                method: "pix",
            },
            callback: (response: any) => console.log(response.data),
        })
    }

    return { sendMessage: (object: any) => sendMessage(JSON.stringify(object)), lastMessage, readyState, pay }
}
