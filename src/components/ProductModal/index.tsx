import { Dialog, CircularProgress, DialogContent, DialogContentText, DialogTitle, DialogActions } from "@mui/material"
import React, { useRef, useState, useEffect } from "react"
import { Product } from "../../definitions/product"
import { useProducts } from "../../hooks/useProducts"
import CloseIcon from "@mui/icons-material/Close"
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation"
import IconButton from "@mui/material/IconButton"
import HelpIcon from "@mui/icons-material/Help"
import { useColors } from "../../hooks/useColors"
import { styles } from "./styles"
import { CurrencyText } from "../CurrencyText"
import { useValidadeCode } from "../../hooks/useValidateCode"
import { useCart } from "../../hooks/useCart"
import { useNavigate } from "react-router-dom"
import { ProductStory } from "../ProductStory"
import { Form, Formik } from "formik"
import TextField from "@mui/material/TextField/TextField"
import MaskedInput from "react-text-mask"
import { useCurrencyMask } from "../../hooks/useCurrencyMask"
import { useNumberMask } from "../../hooks/useNumberMask"
import { useApi } from "../../hooks/useApi"
import { ReactComponent as MinusIcon } from "../../images/product/minus.svg"
import { ReactComponent as PlusIcon } from "../../images/product/plus.svg"
import { Button } from "../Button"

interface ProductModalProps {
    open: boolean
    setOpen: (open: boolean) => void
    product: Product
}

export const ProductModal: React.FC<ProductModalProps> = ({ open, setOpen, product }) => {
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [quantity, setQuantity] = useState(1)

    const colors = useColors()
    const currencyMask = useCurrencyMask()
    const numberMask = useNumberMask()
    const api = useApi()
    const { refresh } = useProducts()
    const { add } = useCart()

    const initialValues: Product = product || {
        name: "",
        description: "",
        stock: 0,
        id: 0,
        image: "",
        price: 0,
        story: "",
        video: "",
    }

    const handleSubmit = (values: Product) => {
        setLoading(true)

        if (product) {
            api.products.update({
                data: values,
                callback: (response: { data: Product }) => {
                    console.log(response.data)
                    setOpen(false)
                    refresh()
                },
                finallyCallback: () => setLoading(false),
            })
        } else {
            api.products.add({
                data: values,
                callback: (response: { data: Product }) => {
                    setOpen(false)
                    refresh()
                },
                finallyCallback: () => setLoading(false),
            })
        }
    }

    const changeQuantity = (value: number) => {
        if (quantity == 1 && value == -1) return

        setQuantity(quantity + value)
    }

    const addToCart = () => {
        add(product, quantity)
        setOpen(false)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <Dialog open={open} onClose={handleClose} sx={styles.dialog}>
            <IconButton onClick={handleClose} sx={{ position: "absolute", right: "1vw" }}>
                <CancelPresentationIcon color="error" sx={styles.close_icon} />
            </IconButton>

            <DialogContent sx={styles.content_container}>
                <div className="info-container">
                    <img src={product.image} alt={product.name} />
                    <div className="text-container">
                        <h1 style={{ alignItems: "center", display: "flex" }}>
                            {product.name}
                            <CurrencyText value={product.price} style={{ fontSize: "2vw", marginLeft: "auto" }} />
                        </h1>
                        <p>{product.description}</p>
                    </div>
                </div>
                <div className="specs-container"></div>
                <div className="story-container"></div>
                <div className="cart-container">
                    <IconButton onClick={() => changeQuantity(-1)}>
                        <MinusIcon style={styles.cart_icon} />
                    </IconButton>
                    <TextField
                        value={quantity}
                        onChange={(event) => setQuantity(Number(event.target.value))}
                        sx={{ width: "12vw" }}
                        InputProps={{
                            sx: {
                                backgroundColor: colors.light_grey,
                                borderRadius: "7vw",
                                height: "5vw",
                            },
                        }}
                        inputProps={{ sx: { textAlign: "center" }, inputMode: "numeric" }}
                    />
                    <IconButton onClick={() => changeQuantity(1)}>
                        <PlusIcon style={styles.cart_icon} />
                    </IconButton>
                    <Button style={{ fontSize: "2vw", width: "45%", marginLeft: "auto" }} onClick={() => addToCart()}>
                        Adicionar ao carrinho
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
