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

interface ProductModalProps {
    open: boolean
    setOpen: (open: boolean) => void
    result: string
}

export const ProductModal: React.FC<ProductModalProps> = ({ open, setOpen, result }) => {
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)
    const [product, setProduct] = useState<Product>()

    const { products } = useProducts()
    const colors = useColors()

    const handleClose = (event: {}, reason: "backdropClick" | "escapeKeyDown") => {
        if (reason) return
        setOpen(false)
    }

    useEffect(() => {
        if (open) {
            const splitted = result.split("/")
            if (splitted.length == 2) {
                if (splitted[0] == "mirasuprimentos") {
                    const id = Number(splitted[1])
                    setError(false)
                    setProduct(products.filter((item) => item.id == id)[0])
                } else {
                    setError(true)
                }
            } else {
                setError(true)
            }
        }
    }, [open])

    useEffect(() => {
        if (error || product) setLoading(false)
    }, [error, product])

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
                                <IconButton>
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
                        ) : (
                            <Button variant="contained" onClick={() => setOpen(false)} fullWidth>
                                Adicionar ao carrinho
                            </Button>
                        )}
                    </DialogActions>
                </>
            )}
        </Dialog>
    )
}
