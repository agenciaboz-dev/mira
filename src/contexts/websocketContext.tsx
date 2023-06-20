import { createContext, useState } from "react"
import React from "react"
import { useApi } from "../hooks/useApi"
import useWebSocket, { ReadyState } from "react-use-websocket"
import { useOrders } from "../hooks/useOrders"
import { useProducts } from "../hooks/useProducts"

export interface Websocket {}

interface WebsocketContextValue {
    send: (object: any) => void
    lastMessage: MessageEvent<any> | null
    readyState: ReadyState
}

interface WebsocketProviderProps {
    children: React.ReactNode
}

const WebsocketContext = createContext<WebsocketContextValue>({} as WebsocketContextValue)

export default WebsocketContext

export const WebsocketProvider: React.FC<WebsocketProviderProps> = ({ children }) => {
    const api = useApi()
    const orders = useOrders()
    const products = useProducts()

    const { sendMessage, lastMessage, readyState } = useWebSocket(`wss://app.agenciaboz.com.br:4102`, {
        onMessage: (message) => {
            const data = JSON.parse(message.data)
            console.log(data)

            if (data.refresh) {
                if (data.refresh == "app") {
                    window.location.reload()
                } else if (data.refresh == "orders") {
                    orders.refresh()
                } else if (data.refresh == "products") {
                    products.refresh()
                }
            }
        },
    })

    const send = (object: any) => {
        sendMessage(JSON.stringify(object))
    }

    return <WebsocketContext.Provider value={{ send, lastMessage, readyState }}>{children}</WebsocketContext.Provider>
}
