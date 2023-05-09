import React from "react"
import { Product } from "../../definitions/product"
import { Dialog, DialogContent, DialogContentText, DialogTitle, IconButton } from "@mui/material"
import { styles } from "./styles"
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation"
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
        <Dialog open={open} onClose={handleClose} sx={styles.dialog}>
            <DialogTitle sx={styles.title}>
                <IconButton onClick={() => setOpen(false)} sx={{ position: "absolute", left: "3vw" }}>
                    <CancelPresentationIcon color="error" sx={styles.close_icon} />
                </IconButton>
                {product?.name}
            </DialogTitle>

            <DialogContent sx={styles.content_container}>
                <DialogContentText sx={{ textAlign: "justify" }}>{product.story}</DialogContentText>
            </DialogContent>
        </Dialog>
    )
}
