import {
    Avatar,
    Box,
    IconButton,
    MenuItem,
    Paper,
    Skeleton,
    TextField,
    RadioGroup,
    Radio,
    FormControl,
    FormLabel,
    FormControlLabel,
} from "@mui/material"
import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import styles from "./styles"
import { useApi } from "../../../hooks/useApi"
import ForwardIcon from "@mui/icons-material/Forward"
import colors from "../../../colors"
import { useStatusEnum } from "../../../hooks/useStatusEnum"
import CircleIcon from "@mui/icons-material/Circle"
import { useCurrencyMask, useCpfMask } from "burgos-masks"
import MaskedInput from "react-text-mask"
import CancelIcon from "@mui/icons-material/Cancel"
import { Orders } from "."


interface OrderProps {}

export const Order: React.FC<OrderProps> = ({}) => {
    const id = useParams().id
    const navigate = useNavigate()
    const api = useApi()
    const statusEnum = useStatusEnum()
    const currencyMask = useCurrencyMask()
    const cpfMask = useCpfMask()

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
                <TextField label="Nº do Pedido" variant="standard" value={order.id} InputProps={{ readOnly: true }} />
                <TextField
                    label="Data da compra"
                    variant="standard"
                    value={new Date(order.date).toLocaleString()}
                    InputProps={{ readOnly: true }}
                />
                <TextField label="Usuário" variant="standard" value={order.user.name} InputProps={{ readOnly: true }} />

                <TextField
                    sx={{ padding: "0.5vw" }}
                    label="Status"
                    variant="standard"
                    value={statusEnum[order.status].title}
                    InputProps={{
                        readOnly: true,
                        startAdornment: <CircleIcon sx={{ width: "1vw", color: statusEnum[order.status].color }} />,
                        sx: { gap: "0.5vw" },
                    }}
                />
            </Box>
            <Box sx={styles.mainContainer}>
                <Paper sx={styles.paper}>
                    <h3 style={{ color: "gray" }}>Dados</h3>
                    <Box sx={{ gap: "1vw" }}>
                        <TextField label="Cliente" variant="standard" value={order.name} InputProps={{ readOnly: true }} />
                        <MaskedInput
                            mask={cpfMask}
                            guide={false}
                            value={order.cpf}
                            render={(ref, props) => (
                                <TextField
                                    inputRef={ref}
                                    {...props}
                                    label="CPF"
                                    variant="standard"
                                    value={order.cpf}
                                    InputProps={{ readOnly: true }}
                                />
                            )}
                        />
                    </Box>
                    <Box sx={{ gap: "1vw" }}>
                        <TextField
                            label="Total"
                            variant="standard"
                            value={`R$ ${order.value.toString().replace(/\./g, ",")}`}
                            InputProps={{ readOnly: true }}
                        />

                        <TextField label="Origem" variant="standard" value="Loja" InputProps={{ readOnly: true }} />
                    </Box>
                    <Box sx={{ gap: "1vw" }}>
                        <FormControl component="fieldset" sx={{ width: "33vw" }}>
                            <FormLabel component="legend" sx={{ fontSize: "0.8vw" }}>
                                Método de pagamento
                            </FormLabel>
                            <RadioGroup
                                row
                                aria-label="options"
                                value={order.method == "card" ? "card" : "PIX"}
                                name="customized-radios"
                            >
                                <FormControlLabel value="card" control={<Radio />} label="Cartão" />
                                <FormControlLabel value="PIX" control={<Radio />} label="Pix" />
                            </RadioGroup>
                        </FormControl>
                        <TextField
                            label="Entrega"
                            variant="standard"
                            value={order.delivery == true ? "Sim" : "Não"}
                            InputProps={{ readOnly: true }}
                        />
                    </Box>

                    {order.delivery && (
                        <Box sx={{ gap: "1vw", flexDirection: "column" }}>
                            <h4 style={{ color: "gray" }}>Endereço de entrega</h4>
                            <p>
                                {order.address.receiver} | {order.address.phone}
                            </p>
                            <p>
                                {order.address.address}, {order.address.number}, {order.address.complement},{" "}
                                {order.address.district}
                            </p>
                            <p>
                                {order.address.cep} {order.address.city}/{order.address.uf}
                            </p>
                            <Box>
                                <h4 style={{ color: "gray" }}>Acompanhe a entrega</h4>
                            </Box>
                        </Box>
                    )}
                </Paper>
                <Paper sx={styles.paper}>
                    <h3 style={{ color: "gray" }}>Produtos ({order.products.length})</h3>
                    {order.products.map((product) => (
                        <Paper key={product.product.id} sx={{ width: "33.0vw", padding: "0.5vw" }}>
                            <Box
                                sx={{
                                    width: "100%",
                                    fontSize: "1vw",
                                    gap: "1vw",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                }}
                            >
                                <Box sx={{ alignItems: "center", justifyContent: "space-between" }}>
                                    <Avatar src={product.product.image} sx={{ bgcolor: "transparent", padding: "0.1vw" }}>
                                        <CancelIcon color="error" sx={{ width: "100%", height: "100%" }} />
                                    </Avatar>
                                    <p style={{ paddingRight: "0.5vw", fontSize: "0.9vw", fontWeight: "500" }}>
                                        {product.quantity} x
                                    </p>
                                    <p style={{ paddingLeft: "1vw", fontSize: "0.8vw" }}>{product.product.name} </p>
                                </Box>{" "}
                                <p style={{ fontSize: "0.9vw" }}> R${product.product.cost}</p>
                            </Box>
                        </Paper>
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
