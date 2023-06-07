import { Box, Dialog, DialogTitle } from "@mui/material"
import React from "react"
import styles from "./styles"
import { TextField } from "../TextField"
import { Button } from "../Button"
import { Service } from "./Service"

interface FreteModalProps {
    open: boolean
    setOpen: (open: boolean) => void
}

export const FreteModal: React.FC<FreteModalProps> = ({ open, setOpen }) => {
    const handleClose = () => {
        setOpen(false)
    }

    return (
        <Dialog open={open} onClose={handleClose} sx={styles.dialog} PaperProps={{ sx: styles.paper }}>
            <DialogTitle sx={styles.title}>Calcule o frete</DialogTitle>
            <Box sx={styles.body}>
                <TextField label="CEP" placeholder="" name="" sx={styles.input}></TextField>
                <Box sx={styles.services}>
                    {" "}
                    <Service />
                    <Service />
                    <Service />
                </Box>
                <Box sx={styles.footer}>
                    <div style={{ flexDirection: "column", alignItems: "flex-end", gap: "1.5vw" }}>
                        <p>
                            <span style={{ fontWeight: "600", color: "#555555", fontSize: "3.6vw" }}>
                                Subtotal de produtos:
                            </span>{" "}
                            R$238,00
                        </p>
                        <p>
                            <span style={{ fontWeight: "600", color: "#555555", fontSize: "3.6vw" }}>Frete:</span> R$15,00
                        </p>
                        <p>
                            <span style={{ fontWeight: "600", color: "#555555", fontSize: "3.6vw" }}>Total do pedido:</span>{" "}
                            R$253,00
                        </p>
                    </div>
                    <Button type="submit" style={{ width: "78vw", fontSize: "4vw" }}>
                        Continuar
                    </Button>
                </Box>
            </Box>
        </Dialog>
    )
}
