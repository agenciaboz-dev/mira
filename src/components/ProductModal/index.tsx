import {
    Dialog,
    CircularProgress,
    DialogContent,
    DialogContentText,
    DialogTitle,
    DialogActions,
    Button,
} from "@mui/material"
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

interface ProductModalProps {
    open: boolean
    setOpen: (open: boolean) => void
    product: Product
}

export const ProductModal: React.FC<ProductModalProps> = ({ open, setOpen, product }) => {
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)
    const [inChart, setInChart] = useState(false)
    const [story, setStory] = useState(false)

    const { products } = useProducts()
    const { cart, setCart } = useCart()
    const colors = useColors()
    const validateCode = useValidadeCode()
    const navigate = useNavigate()

    const handleClose = (event: {}, reason: "backdropClick" | "escapeKeyDown") => {
        if (reason) return
        setOpen(false)
    }

    const addToCart = () => {
        if (product) {
            setCart([...cart, { ...product, quantity: 1 }])
            setOpen(false)
            navigate("/cart")
        }
    }

    const checkChart = () => {
        cart.map((item) => {
            if (item.id == product?.id) {
                setInChart(true)
                return
            } else {
                setInChart(false)
            }
        })
    }

    useEffect(() => {
        checkChart()
    }, [])

    return (
        <Dialog open={open} onClose={handleClose} sx={styles.dialog}>
            {loading ? (
                <CircularProgress color="primary" sx={{ alignSelf: "center" }} />
            ) : (
                <>
                    {!!error ? (
                        <>
                            <DialogTitle sx={styles.title}>Erro</DialogTitle>
                            <DialogContent sx={styles.content_container}>
                                Não foi possível reconhecer esse código QR
                            </DialogContent>
                        </>
                    ) : (
                        <>
                            <DialogTitle sx={styles.title}>
                                <IconButton onClick={() => setOpen(false)}>
                                    <CancelPresentationIcon color="error" sx={styles.close_icon} />
                                </IconButton>
                                {product?.name}
                                <IconButton onClick={() => setStory(true)}>
                                    <HelpIcon color="primary" sx={styles.close_icon} />
                                </IconButton>
                            </DialogTitle>

                            <DialogContent sx={styles.content_container}>
                                <DialogContentText sx={{ textAlign: "justify" }}>{product?.description}</DialogContentText>
                                <div className="price-container" style={styles.price_container}>
                                    {product?.available ? (
                                        <DialogContentText color={colors.green} sx={styles.text}>
                                            Disponível
                                        </DialogContentText>
                                    ) : (
                                        <DialogContentText color={colors.red} sx={styles.text}>
                                            Indisponível
                                        </DialogContentText>
                                    )}
                                    <CurrencyText value={product?.price!} style={styles.price} />
                                </div>
                            </DialogContent>
                        </>
                    )}
                    <DialogActions>
                        {!!error ? (
                            <Button variant="contained" onClick={() => setOpen(false)} fullWidth>
                                Tentar novamente
                            </Button>
                        ) : inChart ? (
                            <Button variant="contained" color="success" onClick={() => setOpen(false)} fullWidth>
                                Produto já está no carrinho
                            </Button>
                        ) : (
                            <Button variant="contained" onClick={addToCart} fullWidth>
                                Adicionar ao carrinho
                            </Button>
                        )}
                    </DialogActions>
                </>
            )}
            {product && <ProductStory product={product} open={story} setOpen={setStory} />}
        </Dialog>
    )
}
