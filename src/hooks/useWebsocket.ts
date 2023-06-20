import { useContext } from "react"
import WebsocketContext from "../contexts/websocketContext"

export const useWebsocket = () => {
    const websocketContext = useContext(WebsocketContext)

    return { ...websocketContext }
}
