import { createContext, useEffect, useState } from "react"
import React from "react"
import { useApi } from "../hooks/useApi"
import useWebSocket, { ReadyState } from "react-use-websocket"
import { useSnackbar } from "burgos-snackbar"
import { useUser } from "../hooks/useUser"
import { useWsRefresh } from "../hooks/useWsRefresh"

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
    const { snackbar } = useSnackbar()
    const { user } = useUser()
    const handleRefresh = useWsRefresh()

    const { sendMessage, lastMessage, readyState } = useWebSocket(`wss://app.agenciaboz.com.br:4102`, {
        onMessage: (message) => {
            const data = JSON.parse(message.data)
            console.log(data)

            if (data.refresh) {
                handleRefresh(data)
            }
        },
        retryOnError: true,
        onClose: () => snackbar({ severity: "warning", text: "Conexão com o servidor perdida, tentando reconectar." }),
        onError: () => snackbar({ severity: "error", text: "Conexão com o servidor perdida, tentando reconectar." }),
        shouldReconnect: (closeEvent) => true,
        reconnectAttempts: 10,
        //attemptNumber will be 0 the first time it attempts to reconnect, so this equation results in a reconnect pattern of 1 second, 2 seconds, 4 seconds, 8 seconds, and then caps at 10 seconds until the maximum number of attempts is reached
        reconnectInterval: (attemptNumber) => Math.min(Math.pow(2, attemptNumber) * 1000, 10000),
    })

    const send = (object: any) => {
        sendMessage(JSON.stringify(object))
    }

    useEffect(() => {
        console.log(readyState)
        if (readyState == 1) {
            if (user) {
                send({ adm: user })
                snackbar({ severity: "success", text: "Conectado com o servidor" })
            }
        }
    }, [readyState])

    return <WebsocketContext.Provider value={{ send, lastMessage, readyState }}>{children}</WebsocketContext.Provider>
}
