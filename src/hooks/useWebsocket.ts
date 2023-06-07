import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket"
import { useOrder } from "./useOrder"
import { useNavigate } from "react-router-dom"
import { Cart } from "../definitions/cart"
import { User } from "../definitions/user"
import { useApi } from "./useApi"
import { useCart } from "./useCart"
import { useUser } from "./useUser"
import { useAddress } from "./useAddress"

export const useWebsocket = () => {
    const { order } = useOrder()
    const api = useApi()
    const url = api.url.split("/")[2]
    const navigate = useNavigate()
    const { cart, total } = useCart()
    const { user } = useUser()
    const { address } = useAddress()

    const { sendMessage, lastMessage, readyState } = useWebSocket(`wss://${url}`, {
        onMessage: (message) => {
            const data = JSON.parse(message.data)
            console.log(data)

            if (data.status == "PAID") {
                navigate("/checkout/finish")
            } else if (data.status == "DECLINED") {
                alert("pagamento recusado")
            }
        },
    })

    const pay = () => {
        api.order.new({
            data: {
                user,
                address,
                total,
                products: cart,
                method: "pix",
            },
            callback: (response: any) => console.log(response.data),
        })
    }

    return { sendMessage: (object: any) => sendMessage(JSON.stringify(object)), lastMessage, readyState, pay }
}
