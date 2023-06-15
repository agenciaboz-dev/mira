import { Avatar, Box, IconButton, MenuItem, Paper, Skeleton, TextField } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import styles from "./styles"
import { useApi } from "../../../hooks/useApi"
import ForwardIcon from "@mui/icons-material/Forward"
import colors from "../../../colors"
import { useStatusEnum } from "../../../hooks/useStatusEnum"
import CircleIcon from "@mui/icons-material/Circle"
import { useCurrencyMask } from "burgos-masks"
import MaskedInput from "react-text-mask"
import CancelIcon from "@mui/icons-material/Cancel"

interface OrderProps {}

export const Order: React.FC<OrderProps> = ({}) => {
    const id = useParams().id
    const navigate = useNavigate()
    const api = useApi()
    const statusEnum = useStatusEnum()
    const currencyMask = useCurrencyMask()

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
                <TextField label="Pedido" variant="standard" value={order.id} InputProps={{ readOnly: true }} />
                <TextField
                    label="Data"
                    variant="standard"
                    value={new Date(order.date).toLocaleString()}
                    InputProps={{ readOnly: true }}
                />
                <TextField label="Cliente" variant="standard" value={order.name} InputProps={{ readOnly: true }} />
                <TextField label="Usuário" variant="standard" value={order.user.name} InputProps={{ readOnly: true }} />
                <TextField
                    label="Status"
                    variant="standard"
                    value={statusEnum[order.status].title}
                    InputProps={{
                        readOnly: true,
                        startAdornment: <CircleIcon sx={{ width: "1vw", color: statusEnum[order.status].color }} />,
                        sx: { gap: "0.6vw" },
                    }}
                />
            </Box>
            <Box sx={styles.mainContainer}>
                <Paper sx={styles.paper}>
                    <Box sx={{ gap: "1vw" }}>
                        <MaskedInput
                            mask={currencyMask}
                            guide={false}
                            value={order.value}
                            render={(ref, props) => (
                                <TextField
                                    inputRef={ref}
                                    {...props}
                                    label="Valor"
                                    variant="standard"
                                    InputProps={{ readOnly: true }}
                                />
                            )}
                        />
                        <TextField
                            label="Método de pagamento"
                            variant="standard"
                            value={order.method == "card" ? "Cartão" : "PIX"}
                            InputProps={{ readOnly: true }}
                        />
                    </Box>
                    <TextField label="CPF" variant="standard" value={order.cpf} InputProps={{ readOnly: true }} />
                </Paper>
                <Paper sx={styles.paper}>
                    {order.products.map((product) => (
                        <Box key={product.id} sx={{ width: "100%", gap: "1vw" }}>
                            <Avatar src={product.image} sx={{ bgcolor: "transparent" }}>
                                <CancelIcon color="error" sx={{ width: "100%", height: "100%" }} />
                            </Avatar>
                            <TextField
                                label="Produto"
                                variant="standard"
                                value={product.name}
                                InputProps={{ readOnly: true }}
                                sx={{ width: "10vw" }}
                            />
                        </Box>
                    ))}
                </Paper>
            </Box>
        </Paper>
    ) : (
        <Paper sx={styles.body}>
            <Skeleton variant="rounded" sx={{ width: "100%", height: "90vh" }} />
        </Paper>
    )
}
