import { Box, CircularProgress, Dialog, DialogContent, DialogTitle, RadioGroup, TextField } from "@mui/material"
import React, { useState, useEffect } from "react"
import styles from "./styles"
import { Button } from "../Button"
import { Service } from "./Service"
import { useApi } from "../../hooks/useApi"
import { useOrder } from "../../hooks/useOrder"
import MaskedInput from "react-text-mask"
import { useCart } from "../../hooks/useCart"
import { CurrencyText } from "../CurrencyText"
import { useNavigate } from "react-router-dom"

interface FreteModalProps {
    open: boolean
    setOpen: (open: boolean) => void
}

export const FreteModal: React.FC<FreteModalProps> = ({ open, setOpen }) => {
    const api = useApi()
    const navigate = useNavigate()

    const { order, setOrder } = useOrder()
    const { cart, total } = useCart()

    const [cep, setCep] = useState("")
    const [loading, setLoading] = useState(false)
    const [quotations, setQuotations] = useState<Quotation[]>([])
    const [quotation, setQuotation] = useState<Quotation>()

    const handleClose = () => {
        setOpen(false)
    }

    const handleContinue = () => {
        if (!quotation) return
        setOrder({ ...order, quotation })
        navigate("/checkout/payment")
    }

    useEffect(() => {
        if (cep.length == 10) {
            if (loading) return

            setQuotations([])
            setLoading(true)
            api.delivery.quotation({
                data: { cep, products: cart, total },
                callback: (response: any) => {
                    setQuotations(response.data.prices)
                },
                finallyCallback: () => setLoading(false),
            })
        }
    }, [cep])

    return (
        <Dialog open={open} onClose={handleClose} sx={styles.dialog} PaperProps={{ sx: styles.paper }}>
            <DialogTitle sx={styles.title}>Calcule o frete</DialogTitle>
            <Box sx={styles.body}>
                <MaskedInput
                    mask={[/\d/, /\d/, ".", /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/]}
                    guide={false}
                    value={cep}
                    onChange={(event) => setCep(event.target.value)}
                    render={(ref, props) => (
                        <TextField
                            inputRef={ref}
                            {...props}
                            placeholder="CEP"
                            InputProps={{
                                endAdornment: loading ? <CircularProgress size={"1.5rem"} color="primary" /> : <></>,
                                sx: { borderRadius: "7vw" },
                            }}
                        />
                    )}
                />
                <RadioGroup
                    value={quotation?.id || 0}
                    onChange={(event, value) => setQuotation(quotations.filter((item) => item.id == Number(value))[0])}
                    sx={styles.services}
                >
                    {quotations.map((quotation) => (
                        <Service key={quotation.id} quotation={quotation} />
                    ))}
                </RadioGroup>
                <Box sx={styles.footer}>
                    <div style={{ flexDirection: "column", alignItems: "flex-end", gap: "1.5vw" }}>
                        <p>
                            <span style={{ fontWeight: "600", color: "#555555", fontSize: "3.6vw" }}>
                                Subtotal de produtos:
                            </span>{" "}
                            <CurrencyText value={total} />
                        </p>
                        {quotation && (
                            <p>
                                <span style={{ fontWeight: "600", color: "#555555", fontSize: "3.6vw" }}>Frete:</span>{" "}
                                <CurrencyText value={quotation.price} />
                            </p>
                        )}
                        <p>
                            <span style={{ fontWeight: "600", color: "#555555", fontSize: "3.6vw" }}>Total do pedido:</span>{" "}
                            <CurrencyText value={total + (quotation?.price || 0)} />
                        </p>
                    </div>
                    <Button onClick={handleContinue}>Continuar</Button>
                </Box>
            </Box>
        </Dialog>
    )
}
