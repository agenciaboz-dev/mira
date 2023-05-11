import { Dialog } from "@mui/material"
import DialogTitle from "@mui/material/DialogTitle"
import IconButton from "@mui/material/IconButton"
import React, { useState } from "react"
import { QRCode } from "react-qrcode-logo"
import { styles } from "./styles"
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation"
import DialogContent from "@mui/material/DialogContent"

interface QrCodeModalProps {
    id: number
    open: boolean
    setOpen: (open: boolean) => void
}

export const QrCodeModal: React.FC<QrCodeModalProps> = ({ id, open, setOpen }) => {
    const vw = window.innerWidth / 100

    const [codeValue, setCodeValue] = useState(`mirasuprimentos/${id}`)

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <Dialog open={open} onClose={handleClose} sx={styles.dialog}>
            <DialogTitle sx={styles.title}>
                <IconButton onClick={handleClose}>
                    <CancelPresentationIcon color="error" sx={styles.close_icon} />
                </IconButton>
            </DialogTitle>

            <DialogContent sx={styles.content_container}>
                <QRCode value={codeValue} size={30 * vw} />
            </DialogContent>
        </Dialog>
    )
}
