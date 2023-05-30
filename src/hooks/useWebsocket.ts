import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket"
import { useOrders } from "./useOrders"
import { useNavigate } from "react-router-dom"
import { Cart } from "../definitions/cart"
import { User } from "../definitions/user"
import { useApi } from "./useApi"
import { useCart } from "./useCart"
import { useUser } from "./useUser"
import { useAddress } from "./useAddress"

export const useWebsocket = () => {
    const { orders, newOrder } = useOrders()
    const api = useApi()
    const navigate = useNavigate()
    const { cart } = useCart()
    const { user } = useUser()
    const { address } = useAddress()

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
                user,
                address,
                products: cart,
                method: "pix",
            },
            callback: (response: any) => console.log(response.data),
        })
    }

    return { sendMessage: (object: any) => sendMessage(JSON.stringify(object)), lastMessage, readyState, pay }
}
