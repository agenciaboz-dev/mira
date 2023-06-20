import React, { useEffect, useState } from "react"
import CreditCardIcon from "@mui/icons-material/CreditCard"
import PixIcon from "@mui/icons-material/Pix"
import Collapsible from "react-collapsible"
import { useColors } from "../../hooks/useColors"
import { Button } from "../../components/Button"
import { CardForm } from "../../components/CardForm"
import { useUser } from "../../hooks/useUser"
import { useNavigate } from "react-router-dom"
import useMeasure from "react-use-measure"
import { useApi } from "../../hooks/useApi"
import { useCart } from "../../hooks/useCart"
import { useAddress } from "../../hooks/useAddress"
import { CircularProgress, SxProps } from "@mui/material"
import { useOrder } from "../../hooks/useOrder"

interface PaymentProps {}

export const Payment: React.FC<PaymentProps> = ({}) => {
    const CreditCardContainer: React.FC<{ open?: boolean }> = ({ open }) => (
        <div className="container" style={{ backgroundColor: open ? colors.purple : "white" }}>
            <CreditCardIcon sx={{ color: open ? "white" : colors.purple }} />
            <h3 style={{ color: open ? "white" : colors.purple }}>Cartão</h3>
        </div>
    )

    const PixContainer: React.FC<{ open?: boolean }> = ({ open }) => (
        // <div className="container" style={{ backgroundColor: open ? colors.purple : "white" }}>
        //     <PixIcon sx={{ color: open ? "white" : colors.purple }} />
        <div className="container" style={{ backgroundColor: open ? colors.purple : "white", marginBottom: "2vw" }}>
            <PixIcon sx={{ color: open ? "white" : colors.purple, width: "5vw", height: "auto" }} />
            <h3 style={{ color: open ? "white" : colors.purple }}>PIX</h3>
        </div>
    )

    const colors = useColors()
    const navigate = useNavigate()
    const [chooseRef, chooseAttributes] = useMeasure()
    const [paymentRef, paymentAttributes] = useMeasure()
    const api = useApi()
    const { user, setUser } = useUser()
    const { cart, total } = useCart()
    const { order, setOrder, quotation } = useOrder()
    const { address } = useAddress()

    const [paymentType, setPaymentType] = useState<"pix" | "credit" | undefined>()
    const [disabled, setDisabled] = useState(false)
    const [loading, setLoading] = useState(false)

    const existing_card = user!.cards?.length > 0

    const [cardType, setCardType] = useState<string>(existing_card ? user!.cards[0].type : "debit")
    const [cardOwner, setCardOwner] = useState<string>(existing_card ? user!.cards[0].name : "")
    const [cardNumber, setCardNumber] = useState<string>(existing_card ? user!.cards[0].number : "")
    const [cardMonth, setCardMonth] = useState<string>(existing_card ? user!.cards[0].expiration_month : "")
    const [cardYear, setCardYear] = useState<string>(existing_card ? user!.cards[0].expiration_year : "")
    const [cardCvv, setCardCvv] = useState<string>(existing_card ? user!.cards[0].cvv : "")
    const [cardError, setCardError] = useState(false)

    const cardValues = { cardType, cardOwner, cardNumber, cardMonth, cardYear, cardCvv }

    const pay_button_style: React.CSSProperties = {
        marginTop: "auto",
        background: disabled ? "linear-gradient(90deg, #9F9F9F 0%, #565656 91.94%)" : "",
        boxShadow: disabled ? "none" : "",
    }

    const handleCardPay = () => {
        if (loading) return
        if (cardError) return

        setLoading(true)

        const script = document.createElement("script")

        script.src = "https://assets.pagseguro.com.br/checkout-sdk-js/rc/dist/browser/pagseguro.min.js"
        script.async = true
        script.onload = () => {
            // @ts-ignore
            const card = window.PagSeguro.encryptCard({
                // sandbox
                // publicKey:
                //     "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAr+ZqgD892U9/HXsa7XqBZUayPquAfh9xx4iwUbTSUAvTlmiXFQNTp0Bvt/5vK2FhMj39qSv1zi2OuBjvW38q1E374nzx6NNBL5JosV0+SDINTlCG0cmigHuBOyWzYmjgca+mtQu4WczCaApNaSuVqgb8u7Bd9GCOL4YJotvV5+81frlSwQXralhwRzGhj/A57CGPgGKiuPT+AOGmykIGEZsSD9RKkyoKIoc0OS8CPIzdBOtTQCIwrLn2FxI83Clcg55W8gkFSOS6rWNbG5qFZWMll6yl02HtunalHmUlRUL66YeGXdMDC2PuRcmZbGO5a/2tbVppW6mfSWG3NPRpgwIDAQAB",
                // production
                publicKey:
                    "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvgwj+Bb1x8SieUMF4o1NWQhgeV4bX0nI7IAa+W+rEVGFk6aNqmKCqzSYLwbw7dwUBWr9GaKyD7aXFvcSGlNimd9/6ix0lGsOoQvzlfPYKn6at10jy8lMxmQPw3u6Z3gX57omXWh2DNHBBxhWTwimXv/nKxIH74F+avvOmjeQHYSz47z71GnEjCQbf05YHkOtbdBW8x8gchyQ6t1nUxohb0keTkmn1YYGNBVA6C6RS1bGVkMVtrzXjtQgwBBAG4JhIExw19ic+4d4YEOWe7UTcKH5EHO1zCAsZorNq9gEfpumTUUI5EX4/ioD2RUvrox0+POHQCwdpNAExGTbRPIPcQIDAQAB",
                holder: cardOwner,
                number: cardNumber.replace(/\s/g, ""),
                expMonth: cardMonth,
                expYear: cardYear,
                securityCode: cardCvv,
            })

            const encrypted = card.encryptedCard
            console.log(encrypted)
            document.body.removeChild(script)

            api.order.new({
                data: {
                    user,
                    address,
                    total,
                    quotation,
                    name: user!.name,
                    cpf: user!.cpf,
                    products: cart,
                    method: "card",
                    card: {
                        encrypted,
                        holder: cardOwner,
                        security_code: cardCvv,
                    },
                },
                callback: (response: any) => {
                    const data = response.data
                    console.log(data.pagseguro)
                    setUser({ ...user!, orders: [data.order] })
                    setOrder({ ...data.order, quotation: order?.quotation || undefined })
                    setTimeout(() => navigate("/checkout/order"), 500)
                },
                finallyCallback: () => setTimeout(() => setLoading(false), 500),
            })
        }

        document.body.appendChild(script)
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

    useEffect(() => {}, [])

    return (
        <div className="Payment-Component" ref={paymentRef}>
            <h2>Faturamento</h2>
            <p>Selecione uma das opções abaixo</p>

            <div className="choose-container" ref={chooseRef}>
                <Collapsible
                    trigger={<CreditCardContainer />}
                    triggerWhenOpen={<CreditCardContainer open />}
                    containerElementProps={{ style: { flexDirection: "column" } }}
                    open={paymentType == "credit"}
                    onOpening={() => setPaymentType("credit")}
                    openedClassName="opened"
                    // onClosing={() => setPaymentType(undefined)}
                >
                    <div className="creditcard-children">
                        <CardForm
                            user={user!}
                            values={cardValues}
                            chooseAttributes={chooseAttributes}
                            paymentAttributes={paymentAttributes}
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
                    openedClassName="opened"
                    // onClosing={() => setPaymentType(undefined)}
                >
                    <p className="pix-children">
                        Gere o código <span>copia e cola</span> ou pague utilizando o leitor de <span>QR Code</span> de outro
                        dispositivo.
                    </p>
                </Collapsible>
            </div>

            {paymentType == "credit" ? (
                <Button onClick={handleCardPay} style={pay_button_style} disabled={disabled}>
                    {cardError ? (
                        "Cartão inválido"
                    ) : loading ? (
                        <CircularProgress size="1.5rem" sx={{ color: "white" }} />
                    ) : (
                        "Finalizar compra"
                    )}
                </Button>
            ) : (
                <Button onClick={() => navigate("/checkout/pix")} style={pay_button_style} disabled={disabled}>
                    Finalizar compra
                </Button>
            )}
        </div>
    )
}
