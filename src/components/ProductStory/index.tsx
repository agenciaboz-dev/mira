import React from "react"
import { Product } from "../../definitions/product"
import { Dialog, DialogContent, DialogContentText, DialogTitle, IconButton } from "@mui/material"
import { styles } from "./styles"
import CancelIcon from "@mui/icons-material/Cancel"
import { useColors } from "../../hooks/useColors"

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
        <Dialog open={open} onClose={handleClose} sx={styles.dialog} PaperProps={{ style: { borderRadius: "4vw" } }} >
            <DialogTitle sx={styles.title}>
                {product?.name}
                <IconButton onClick={() => setOpen(false)} sx={{ position: "absolute", top: 0, right: 0 }}>
                    <CancelIcon color="error" sx={styles.close_icon} />
                </IconButton>
            </DialogTitle>

            <DialogContent sx={styles.content_container}>
                <DialogContentText sx={{ textAlign: "justify" }}>{product.story}</DialogContentText>
            </DialogContent>
        </Dialog>
    )
}
