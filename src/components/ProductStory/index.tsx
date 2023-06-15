import React from "react"
import { Product } from "../../definitions/product"
import { Dialog, DialogContent, DialogContentText, DialogTitle, IconButton } from "@mui/material"
import { styles } from "./styles"
import CancelIcon from "@mui/icons-material/Cancel"
import { useColors } from "../../hooks/useColors"
import { style } from "../Button/style"

interface ProductStoryProps {
    product: Product
    open: boolean
    setOpen: (open: boolean) => void
}

export const ProductStory: React.FC<ProductStoryProps> = ({ product, open, setOpen }) => {
    const colors = useColors()

    const handleClose = (event: {}, reason: "backdropClick" | "escapeKeyDown") => {
        // if (reason) return
        setOpen(false)
    }

    return (
        <Dialog open={open} onClose={handleClose} sx={styles.dialog} PaperProps={{ sx: {border: "1px solid #555555", boxShadow: "2px 8px 0px #1a80b8", borderRadius: "10vw", width: "86vw" }}}>
            <DialogTitle sx={styles.title}>
                {product?.name}
                <IconButton onClick={() => setOpen(false)} sx={{ position: "absolute", top: "1vw", right: "1vw" }}>
                    <CancelIcon color="error" sx={styles.close_icon} />
                </IconButton>
            </DialogTitle>

            <DialogContent sx={styles.content_container}>
                <DialogContentText sx={{ textAlign: "justify" }}>{product.story}</DialogContentText>
            </DialogContent>
        </Dialog>
    )
}
