import React, { useEffect, useState } from "react"
import CreditCardIcon from "@mui/icons-material/CreditCard"
import PixIcon from "@mui/icons-material/Pix"
import Collapsible from "react-collapsible"
import { useColors } from "../../hooks/useColors"
import { Button } from "../../components/Button"
import { Financial } from "../Profile/Financial"
import { CardForm } from "../../components/CardForm"
import { useUser } from "../../hooks/useUser"
import { useNavigate } from "react-router-dom"

interface PaymentProps {}

export const Payment: React.FC<PaymentProps> = ({}) => {
    const CreditCardContainer: React.FC<{ open?: boolean }> = ({ open }) => (
        <div className="container" style={{ backgroundColor: open ? colors.purple : "white" }}>
            <CreditCardIcon sx={{ color: open ? "white" : colors.purple, width: "5vw", height: "auto" }} />
            <h3 style={{ color: open ? "white" : colors.purple }}>Cartão</h3>
        </div>
    )

    const PixContainer: React.FC<{ open?: boolean }> = ({ open }) => (
        <div className="container" style={{ backgroundColor: open ? colors.purple : "white" }}>
            <PixIcon sx={{ color: open ? "white" : colors.purple, width: "5vw", height: "auto" }} />
            <h3 style={{ color: open ? "white" : colors.purple }}>PIX</h3>
        </div>
    )

    const colors = useColors()
    const navigate = useNavigate()
    const { user } = useUser()

    const [paymentType, setPaymentType] = useState<"pix" | "credit" | undefined>("pix")
    const [disabled, setDisabled] = useState(false)

    const [cardType, setCardType] = useState<string>("debit")
    const [cardOwner, setCardOwner] = useState<string>("")
    const [cardNumber, setCardNumber] = useState<string>("")
    const [cardMonth, setCardMonth] = useState<string>("")
    const [cardYear, setCardYear] = useState<string>("")
    const [cardCvv, setCardCvv] = useState<string>("")
    const [cardError, setCardError] = useState(false)

    const cardValues = { cardType, cardOwner, cardNumber, cardMonth, cardYear, cardCvv }

    const handleClick = () => {
        // pagseguro handling

        if (paymentType == "credit") {
            console.log(cardValues)
            if (cardError) return

            navigate("/checkout/finish")
        } else {
            navigate("/checkout/pix")
        }
    }

    useEffect(() => {
        console.log({ cardError })
        if (paymentType == "credit" && cardError) {
            setDisabled(true)
        } else setDisabled(false)
    }, [cardError])

    useEffect(() => {
        setDisabled(!paymentType)
        if (paymentType == "credit" && cardError) setDisabled(true)
    }, [paymentType])

    return (
        <div className="Payment-Component">
            <h2>Faturamento</h2>
            <p>Selecione uma das opções abaixo</p>

            <div className="choose-container">
                <Collapsible
                    trigger={<CreditCardContainer />}
                    triggerWhenOpen={<CreditCardContainer open />}
                    containerElementProps={{ style: { flexDirection: "column" } }}
                    open={paymentType == "credit"}
                    onOpening={() => setPaymentType("credit")}
                    // onClosing={() => setPaymentType(undefined)}
                >
                    <div className="creditcard-children">
                        <CardForm
                            user={user!}
                            values={cardValues}
                            setValues={{
                                setCardType,
                                setCardOwner,
                                setCardNumber,
                                setCardMonth,
                                setCardYear,
                                setCardCvv,
                                setCardError,
                            }}
                        />
                    </div>
                </Collapsible>

                <Collapsible
                    trigger={<PixContainer />}
                    triggerWhenOpen={<PixContainer open />}
                    containerElementProps={{ style: { flexDirection: "column" } }}
                    open={paymentType == "pix"}
                    onOpening={() => setPaymentType("pix")}
                    // onClosing={() => setPaymentType(undefined)}
                >
                    <p className="pix-children">
                        Gere o código <span>copia e cola</span> ou page utilizando o leitor de <span>QR Code</span> de outro
                        dispositivo.
                    </p>
                </Collapsible>
            </div>

            <img style={{ marginTop: "auto" }} src="/address.mirinha.png" alt="Mirinha" />

            <Button
                onClick={handleClick}
                style={{
                    fontSize: "3vw",
                    background: disabled ? "linear-gradient(90deg, #9F9F9F 0%, #565656 91.94%)" : "",
                    boxShadow: disabled ? "none" : "",
                }}
                disabled={disabled}
            >
                {paymentType == "credit" && cardError ? "Cartão inválido" : "Finalizar compra"}
            </Button>
        </div>
    )
}
