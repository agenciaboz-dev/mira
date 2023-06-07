import { Box, Dialog, DialogTitle } from "@mui/material"
import React from "react"
import styles from "./styles"

interface FreteModalProps {
    open: boolean
    setOpen: (open: boolean) => void
}

export const FreteModal: React.FC<FreteModalProps> = ({ open, setOpen }) => {
    const handleClose = () => {
        setOpen(false)
    }

    return (
        <Dialog open={open} onClose={handleClose} sx={styles.dialog}>
            <DialogTitle sx={styles.title}>Calcule o frete</DialogTitle>
            <Box sx={styles.body}>
                <p>oi</p>
                <p>oi</p>
                <p>oi</p>
                <p>oi</p>
                <p>oi</p>
                <p>oi</p>
                <p>oi</p>
            </Box>
        </Dialog>
    )
}
