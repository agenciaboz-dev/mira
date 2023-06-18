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
import { CircularProgress, Box } from "@mui/material"
import { useOrder } from "../../hooks/useOrder"
import { TextField } from "../../components/TextField"
import MaskedInput from "react-text-mask"
import { useCpfMask } from "burgos-masks"

interface PaymentProps {}

export const Payment: React.FC<PaymentProps> = ({}) => {
    const CreditCardContainer: React.FC<{ open?: boolean }> = ({ open }) => (
        <div className="container" style={{ backgroundColor: open ? colors.purple : "white" }}>
            <CreditCardIcon sx={{ color: open ? "white" : colors.purple, width: "5vw", height: "auto" }} />
            <h3 style={{ color: open ? "white" : colors.purple }}>Cartão</h3>
        </div>
    )

    const PixContainer: React.FC<{ open?: boolean }> = ({ open }) => (
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
    const cpfMask = useCpfMask()
    const { user, setUser } = useUser()
    const { cart, total } = useCart()
    const { order, setOrder } = useOrder()
    const { address } = useAddress()

    const [paymentType, setPaymentType] = useState<"pix" | "credit" | undefined>()
    const [disabled, setDisabled] = useState(false)
    const [loading, setLoading] = useState(false)

    const [cardType, setCardType] = useState<string>("debit")
    const [cardOwner, setCardOwner] = useState<string>("")
    const [cardNumber, setCardNumber] = useState<string>("")
    const [cardMonth, setCardMonth] = useState<string>("")
    const [cardYear, setCardYear] = useState<string>("")
    const [cardCvv, setCardCvv] = useState<string>("")
    const [cardError, setCardError] = useState(false)
    const [cpf, setCpf] = useState("")

    const cardValues = { cardType, cardOwner, cardNumber, cardMonth, cardYear, cardCvv, cpf }

    const handleClick = () => {
        // pagseguro handling

        if (paymentType == "credit") {
            console.log(cardValues)
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
                        cpf: cpf.replace(/\D/g, ""),
                        name: cardOwner,
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

            // navigate("/checkout/finish")
        } else {
            navigate("/checkout/pix", { state: { cpf: cpf.replace(/\D/g, ""), name: cardOwner } })
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
                                setCpf,
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
                    <Box sx={{ flexDirection: "column", width: "100%", gap: "3vw" }}>
                        <TextField
                            placeholder="Nome do titular"
                            name="name"
                            value={cardOwner}
                            onChange={(event) => setCardOwner(event.target.value)}
                            InputProps={{ style: { border: `1px solid ${colors.purple2}` } }}
                        />
                        <MaskedInput
                            mask={cpfMask}
                            guide={false}
                            name="cpf"
                            value={cpf}
                            onChange={(event) => setCpf(event.target.value)}
                            render={(ref, props) => (
                                <TextField
                                    inputRef={ref}
                                    {...props}
                                    placeholder="CPF do titular"
                                    InputProps={{ style: { border: `1px solid ${colors.purple2}` } }}
                                />
                            )}
                        />
                        <p className="pix-children">
                            Gere o código <span>copia e cola</span> ou pague utilizando o leitor de <span>QR Code</span> de
                            outro dispositivo.
                        </p>
                    </Box>
                </Collapsible>
            </div>

            <div className="avatar-security-container">
                <img src="/mira_text_tablet.png" alt="Mira" />
                <p className="avatar-security-text">Olá novamente! Mira aqui.<br />Levamos muito a sério a sua segurança, então, como sabemos que esse dispositivo é de uso comum, nenhuma das informações inseridas aqui será salva, fique tranquilo!</p>
            </div>

            <Button
                onClick={handleClick}
                style={{
                    // marginTop: "auto",
                    background: disabled ? "linear-gradient(90deg, #9F9F9F 0%, #565656 91.94%)" : "",
                    boxShadow: disabled ? "none" : "",
                    fontSize: "3vw",
                    padding: "1vw 3vw",
                }}
                disabled={disabled}
            >
                {loading ? (
                    <CircularProgress size={"2rem"} sx={{ color: "white" }} />
                ) : paymentType == "credit" && cardError ? (
                    "Cartão inválido"
                ) : (
                    "Finalizar compra"
                )}
            </Button>
        </div>
    )
}
