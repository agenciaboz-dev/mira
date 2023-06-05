import { Box, Dialog, Skeleton } from "@mui/material"
import DialogTitle from "@mui/material/DialogTitle"
import { IconButton, Paper } from "@mui/material"
import React, { forwardRef, useEffect, useRef, useState } from "react"
import { QRCode } from "react-qrcode-logo"
import { styles } from "./styles"
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation"
import DialogContent from "@mui/material/DialogContent"
import { useColors } from "../../hooks/useColors"
import { useCurrentProduct } from "../../hooks/useCurrentProduct"
import { saveAs } from "file-saver"

interface QrCodeModalProps {
    open: boolean
    setOpen: (open: boolean) => void
}

const MyQRCode = forwardRef<HTMLDivElement, React.ComponentProps<typeof QRCode>>((props, ref) => (
    <Box ref={ref}>
        <QRCode {...props} />
    </Box>
))

export const QrCodeModal: React.FC<QrCodeModalProps> = ({ open, setOpen }) => {
    const vw = window.innerWidth / 100
    const colors = useColors()
    const ref = useRef<HTMLDivElement>(null)
    const { currentProduct, setCurrentProduct } = useCurrentProduct()

    const [loading, setLoading] = useState(true)
    const [codeValue, setCodeValue] = useState(`mirasuprimentos/${currentProduct?.id}`)

    const handleClose = () => {
        setOpen(false)
        setCurrentProduct(null)
    }

    const downloadImage = () => {
        const canvas = ref.current?.querySelector("canvas")
        canvas?.toBlob((blob: Blob | null) => {
            if (blob) saveAs(blob, `${currentProduct?.name}.png`)
        })
    }

    useEffect(() => {
        if (open) {
            setCodeValue(`mirasuprimentos/${currentProduct?.id}`)
            console.log(codeValue)
            setTimeout(() => {
                setLoading(false)
                console.log(codeValue)
            }, 1000)
        } else {
            setLoading(true)
        }
    }, [open])

    return (
        <Dialog open={open} onClose={handleClose} sx={styles.dialog}>
            {/* <DialogTitle sx={styles.title}>
                <IconButton onClick={handleClose}>
                    <CancelPresentationIcon color="error" sx={styles.close_icon} />
                </IconButton>
            </DialogTitle> */}

            <Paper sx={styles.content_container}>
                {loading ? (
                    <Skeleton variant="rounded" animation="wave" sx={{ width: 30 * vw, height: 30 * vw }} />
                ) : (
                    <div onClick={downloadImage}>
                        <MyQRCode value={codeValue} size={30 * vw} ref={ref} />
                    </div>
                )}
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
