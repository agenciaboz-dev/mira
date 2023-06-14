import { Box, IconButton, MenuItem, Paper, Skeleton, TextField } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import styles from "./styles"
import { useApi } from "../../../hooks/useApi"
import ForwardIcon from "@mui/icons-material/Forward"
import colors from "../../../colors"

interface OrderProps {}

export const Order: React.FC<OrderProps> = ({}) => {
    const id = useParams().id
    const navigate = useNavigate()
    const api = useApi()

    const [order, setOrder] = useState<Order>()

    useEffect(() => {
        console.log(order)
    }, [order])

    useEffect(() => {
        if (id) {
            api.orders.id({
                data: { id },
                callback: (response: { data: Order }) => setOrder(response.data),
            })
        } else {
            navigate("/dashboard/orders")
        }
    }, [])

    return id && order ? (
        <Paper sx={styles.body} elevation={5}>
            <Box sx={styles.header}>
                <IconButton onClick={() => navigate("/dashboard/orders")}>
                    <ForwardIcon sx={{ color: colors.primary, transform: "rotate(180deg)", width: "3vw", height: "3vw" }} />
                </IconButton>
                <TextField label="Pedido" value={order.id} InputProps={{ readOnly: true }} />
                <TextField label="Data" value={new Date(order.date).toLocaleString()} InputProps={{ readOnly: true }} />
                <TextField label="Cliente" value={order.user.name} InputProps={{ readOnly: true }} />
            </Box>
        </Paper>
    ) : (
        <Paper sx={styles.body}>
            <Skeleton variant="rounded" sx={{ width: "100%", height: "90vh" }} />
        </Paper>
    )
}
