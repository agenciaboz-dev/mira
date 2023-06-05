import { Box } from "@mui/material"
import React, { useEffect } from "react"
import { useUser } from "../../hooks/useUser"
import { useWebsocket } from "../../hooks/useWebsocket"

interface OrderProps {}

export const Order: React.FC<OrderProps> = ({}) => {
    const { user } = useUser()
    const ws = useWebsocket()
    const order = user?.orders.filter((item) => item.status === 0)[0]

    useEffect(() => {
        console.log(order)
        ws.sendMessage({ order })
    }, [])

    return (
        <Box sx={{ flexDirection: "column", padding: "1vw", gap: "2vw" }}>
            <h4>Pedido nº {order?.id}</h4>
            <p>Seu pagamento está sendo processado</p>
        </Box>
    )
}
