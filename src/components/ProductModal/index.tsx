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

    const title_style = {
        fontSize: "5vw",
        textAlign: "center",
    }

    const content_container_style = {
        flexDirection: "column",
        gap: "3vw",
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
        <Dialog open={open} onClose={handleClose} PaperProps={{ sx: { width: "85vw" } }}>
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
                        <Button onClick={() => setOpen(false)}>Cancelar</Button>
                    </DialogActions>
                </>
            )}
        </Dialog>
    )
}
