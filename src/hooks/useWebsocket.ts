import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket"

export const useWebsocket = () => {
    const { sendMessage, lastMessage, readyState } = useWebSocket("ws://localhost:4102", {
        onMessage: (message) => {
            const data = JSON.parse(message.data)
            console.log(data)
        },
    })

    return { sendMessage: (object: any) => sendMessage(JSON.stringify(object)), lastMessage, readyState }
}
