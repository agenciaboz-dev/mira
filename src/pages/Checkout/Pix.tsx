import React, { useState } from "react"
import { QRCode } from "react-qrcode-logo"
import { CurrencyText } from "../../components/CurrencyText"
import { useCart } from "../../hooks/useCart"
import { ReactComponent as CopyIcon } from "../../images/copy.svg"
import { Button } from "../../components/Button"
import { useClipboard } from "../../hooks/useClipboard"
import { useNavigate } from "react-router-dom"

interface PixProps {}

export const Pix: React.FC<PixProps> = ({}) => {
    const vw = window.innerWidth / 100

    const { total } = useCart()
    const clipboard = useClipboard()
    const navigate = useNavigate()

    const [qrCodeValue, setQrCodeValue] = useState("https://mira.agenciaboz.com.br")
    const [buttonText, setButtonText] = useState("Copiar código")

    const handleClick = () => {
        clipboard.copy(qrCodeValue)
        setButtonText("Copiado")
        setTimeout(() => setButtonText("Copiar código"), 5000)
        setTimeout(() => navigate("/checkout/finish"), 5000)
    }

    return (
        <div className="Pix-Component">
            <h4>Como você gostaria de efetuar o pagamento do PIX?</h4>
            <p>Mostre o QR code na sua tela ou copie o código copia e cola para efetuar o pagamento.</p>
            <p>Esse código é válido por 1 hora.</p>

            <div className="code-wrapper">
                <QRCode value={qrCodeValue} size={60 * vw} />
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
