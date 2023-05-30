import React, { useState, useEffect } from "react"
import { QRCode } from "react-qrcode-logo"
import { CurrencyText } from "../../components/CurrencyText"
import { useCart } from "../../hooks/useCart"
import { ReactComponent as CopyIcon } from "../../images/copy.svg"
import { Button } from "../../components/Button"
import { useClipboard } from "../../hooks/useClipboard"
import { useNavigate } from "react-router-dom"
import { useWebsocket } from "../../hooks/useWebsocket"
import { useUser } from "../../hooks/useUser"
import { useApi } from "../../hooks/useApi"
import { useAddress } from "../../hooks/useAddress"
import { Skeleton } from "@mui/material"

interface PixProps {}

export const Pix: React.FC<PixProps> = ({}) => {
    const vw = window.innerWidth / 100

    const clipboard = useClipboard()
    const navigate = useNavigate()
    const ws = useWebsocket()
    const api = useApi()
    const { address } = useAddress()
    const { cart, total } = useCart()
    const { user } = useUser()

    const [qrCodeValue, setQrCodeValue] = useState("")
    const [qrCode, setQrCode] = useState<any>()
    const [buttonText, setButtonText] = useState("Copiar código")

    const handleClick = () => {
        clipboard.copy(qrCode?.id)
        setButtonText("Copiado")
        setTimeout(() => setButtonText("Copiar código"), 5000)
        // setTimeout(() => navigate("/checkout/finish"), 5000)
        // ws.pay()
    }

    useEffect(() => {
        api.order.new({
            data: {
                user,
                address,
                total,
                products: cart,
                method: "pix",
            },
            callback: (response: any) => {
                const { pagseguro, order } = response.data
                ws.sendMessage({ order })
                console.log(pagseguro)
                setQrCodeValue(pagseguro.qr_codes[0].text)
                setQrCode(pagseguro.qr_codes[0])
            },
        })
    }, [])

    return (
        <div className="Pix-Component">
            <h4>Como você gostaria de efetuar o pagamento do PIX?</h4>
            <p>Mostre o QR code na sua tela ou copie o código copia e cola para efetuar o pagamento.</p>
            <p>Esse código é válido por 1 hora.</p>

            <div className="code-wrapper">
                {qrCodeValue ? (
                    <QRCode value={qrCodeValue} size={60 * vw} />
                ) : (
                    <Skeleton
                        variant="rounded"
                        animation="wave"
                        sx={{ width: 60 * vw, height: 60 * vw, borderRadius: "5vw" }}
                    />
                )}
            </div>

            <div className="totals-container">
                <h4>Total do pedido</h4>
                <CurrencyText value={total} style={{ color: "black", fontSize: "10vw", fontWeight: "bold" }} />
            </div>

            <Button onClick={handleClick} style={{ padding: "2vw 12vw", gap: "10vw", justifyContent: "flex-start" }}>
                <CopyIcon style={{ width: "7vw", height: "auto" }} />
                {buttonText}
            </Button>
        </div>
    )
}
