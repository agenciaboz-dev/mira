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

    const handleClose = (event: {}, reason: "backdropClick" | "escapeKeyDown") => {
        if (reason) return
        setOpen(false)
    }

    const dialog_style = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }

    const title_style = {
        fontSize: "5vw",
        textAlign: "center",
    }

    const content_container_style = {
        gap: "3vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    }

    const close_icon_style = {
        width: "7vw",
        height: "auto",
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
        <Dialog open={open} onClose={handleClose} sx={dialog_style}>
            <IconButton sx={{ position: "absolute" }} onClick={() => setOpen(false)}>
                <CancelPresentationIcon color="error" sx={close_icon_style} />
            </IconButton>
            {loading ? (
                <CircularProgress color="primary" sx={{ alignSelf: "center" }} />
            ) : (
                <>
                    {!!error ? (
                        <>
                            <DialogTitle sx={title_style}>Erro</DialogTitle>
                            <DialogContent sx={content_container_style}>
                                Não foi possível reconhecer esse código QR
                            </DialogContent>
                        </>
                    ) : (
                        <>
                            <DialogTitle sx={title_style}>{product?.name}</DialogTitle>
                            <DialogContent sx={content_container_style}>{product?.description}</DialogContent>
                        </>
                    )}
                    <DialogActions>
                        <Button variant="contained" onClick={() => setOpen(false)} fullWidth>
                            Adicionar ao carrinho
                        </Button>
                    </DialogActions>
                </>
            )}
        </Dialog>
    )
}
