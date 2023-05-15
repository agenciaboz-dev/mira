import React, { useEffect, useState } from "react"
import CreditCardIcon from "@mui/icons-material/CreditCard"
import PixIcon from "@mui/icons-material/Pix"
import Collapsible from "react-collapsible"
import { useColors } from "../../hooks/useColors"

interface PaymentProps {}

export const Payment: React.FC<PaymentProps> = ({}) => {
    const CreditCardContainer: React.FC<{ open?: boolean }> = ({ open }) => (
        <div className="container" style={{ backgroundColor: open ? colors.purple : "white" }}>
            <CreditCardIcon sx={{ color: open ? "white" : colors.purple }} />
            <h3 style={{ color: open ? "white" : colors.purple }}>Cartão</h3>
        </div>
    )

    const PixContainer: React.FC<{ open?: boolean }> = ({ open }) => (
        <div className="container" style={{ backgroundColor: open ? colors.purple : "white" }}>
            <PixIcon sx={{ color: open ? "white" : colors.purple }} />
            <h3 style={{ color: open ? "white" : colors.purple }}>PIX</h3>
        </div>
    )

    const colors = useColors()

    const [paymentType, setPaymentType] = useState<"pix" | "credit" | undefined>()

    useEffect(() => {
        console.log(paymentType)
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
                >
                    <div className="creditcard-container">vamo pagar com cartão</div>
                </Collapsible>

                <Collapsible
                    trigger={<PixContainer />}
                    triggerWhenOpen={<PixContainer open />}
                    containerElementProps={{ style: { flexDirection: "column" } }}
                    open={paymentType == "pix"}
                    onOpening={() => setPaymentType("pix")}
                >
                    <div className="pix-container">vamo pagar com pix</div>
                </Collapsible>
            </div>
        </div>
    )
}
