import { Dialog } from "@mui/material"
import DialogTitle from "@mui/material/DialogTitle"
import { IconButton, Paper } from "@mui/material"
import React, { useState } from "react"
import { QRCode } from "react-qrcode-logo"
import { styles } from "./styles"
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation"
import DialogContent from "@mui/material/DialogContent"
import { useColors } from "../../hooks/useColors"
import { useCurrentProduct } from "../../hooks/useCurrentProduct"

interface QrCodeModalProps {
    open: boolean
    setOpen: (open: boolean) => void
}

export const QrCodeModal: React.FC<QrCodeModalProps> = ({ open, setOpen }) => {
    const vw = window.innerWidth / 100
    const colors = useColors()
    const { currentProduct, setCurrentProduct } = useCurrentProduct()

    const [codeValue, setCodeValue] = useState(`mirasuprimentos/${currentProduct?.id}`)

    const handleClose = () => {
        setOpen(false)
        setCurrentProduct(null)
    }

    return (
        <Dialog open={open} onClose={handleClose} sx={styles.dialog}>
            {/* <DialogTitle sx={styles.title}>
                <IconButton onClick={handleClose}>
                    <CancelPresentationIcon color="error" sx={styles.close_icon} />
                </IconButton>
            </DialogTitle> */}

            <Paper sx={styles.content_container}>
                <QRCode value={codeValue} size={30 * vw} />
                {/* <QRCode
                    value={codeValue}
                    size={30 * vw}
                    // bgColor={colors.purple}
                    // fgColor={colors.purple}
                    logoImage={"/logo.png"}
                    logoOpacity={0.3}
                    logoWidth={30 * vw}
                    eyeColor={colors.purple}
                    qrStyle={"dots"}
                /> */}
            </Paper>
        </Dialog>
    )
}
