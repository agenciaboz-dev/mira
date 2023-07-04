import { Box, Dialog, MenuItem, Skeleton, SxProps } from "@mui/material"
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
import SaveIcon from "@mui/icons-material/Save"

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
    const [hover, setHover] = useState(false)
    const [codeValue, setCodeValue] = useState(`https://app.mirasuprimentos.com.br/download?id=${currentProduct?.id}`)

    const downloadMenuItemStyle: SxProps = {
        position: "absolute",
        width: "99%",
        height: "99%",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        // opacity: "0.85",

        "&:hover": {
            background: "none",
        },
    }

    const downloadIconStyle: SxProps = {
        transition: "0.1s",
        width: "0.1vw",
        height: "auto",
        backgroundColor: colors.purple,
        borderRadius: "20%",
        transform: hover ? "scale(150)" : "",
    }

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
                    <div onClick={downloadImage} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                        <MenuItem sx={downloadMenuItemStyle}>
                            <SaveIcon sx={downloadIconStyle} />
                        </MenuItem>
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
