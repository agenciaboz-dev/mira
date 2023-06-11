import { Dialog, CircularProgress, DialogContent, DialogContentText, DialogTitle, DialogActions } from "@mui/material"
import React, { useRef, useState, useEffect } from "react"
import { Product } from "../../definitions/product"
import { useProducts } from "../../hooks/useProducts"
import CloseIcon from "@mui/icons-material/Close"
import CancelIcon from '@mui/icons-material/Cancel';
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
import { Specs1 } from "./Specs1"
import { Specs2 } from "./Specs2"

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
    const { add, isInCart } = useCart()

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
        <Dialog open={open} onClose={handleClose} sx={styles.dialog} PaperProps={{ sx: { borderRadius: "3vw" } }}>
            <IconButton onClick={handleClose} sx={{ position: "absolute", right: "1vw" }}>
                <CancelIcon color="error" sx={styles.close_icon} />
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
                        <div className="specs1-container" style={{ width: "100%", justifyContent: "space-between" }}>
                            <Specs1 title="Quantidade" value="18 X 27" />
                            <Specs1 title="Tipo" value="Chata / Lisa" />
                            <Specs1 title="Peso" value="1Kg" />
                        </div>
                    </div>
                </div>
                <div className="specs-container">
                    <Specs2 title="Fabricante" value="ArcelorMittal" colors={["#EBEBEB", "#F5F5F5"]} />
                    <Specs2 title="Tipo de cabeça do prego" value="Chata" colors={["#F5F5F5", "#FFFFFF"]} />
                    <Specs2 title="Tipo de corpo do prego" value="Quantidade" colors={["#EBEBEB", "#F5F5F5"]} />
                </div>
                <div className="story-container">{product.story}</div>
                <div className="cart-container">
                    <IconButton onClick={() => changeQuantity(-1)}>
                        <MinusIcon style={styles.cart_icon} />
                    </IconButton>
                    <TextField
                        value={quantity}
                        onChange={(event) => setQuantity(Number(event.target.value))}
                        sx={{ width: "10vw !important" }}
                        InputProps={{
                            sx: {
                                backgroundColor: colors.light_grey,
                                borderRadius: "7vw",
                                height: "5vw",
                                width: "10vw"
                            },
                        }}
                        inputProps={{ sx: { textAlign: "center" }, inputMode: "numeric" }}
                    />
                    <IconButton onClick={() => changeQuantity(1)}>
                        <PlusIcon style={styles.cart_icon} />
                    </IconButton>
                    <Button
                        style={{
                            fontSize: "2.5vw",
                            width: "50%",
                            marginLeft: "auto",
                            background: isInCart(product) ? "linear-gradient(90deg, #9F9F9F 0%, #565656 91.94%)" : "",
                            boxShadow: isInCart(product) ? "none" : "",
                        }}
                        onClick={() => addToCart()}
                        disabled={isInCart(product)}
                    >
                        {isInCart(product) ? "Produto no carrinho" : "Adicionar ao carrinho"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
