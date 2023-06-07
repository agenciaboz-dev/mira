import React, { useEffect } from "react"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import { useColors } from "../../hooks/useColors"
import { useAddress } from "../../hooks/useAddress"
import { Button } from "../../components/Button"
import { ReactComponent as DeliveryIcon } from "../../images/checkout/delivery.svg"
import TimerIcon from "@mui/icons-material/Timer"
import { DateTime } from "luxon"
import { useTimer } from "react-timer-hook"
import { useApi } from "../../hooks/useApi"
import { useCart } from "../../hooks/useCart"
import { useOrder } from "../../hooks/useOrder"

interface FinishProps {}

export const Finish: React.FC<FinishProps> = ({}) => {
    const colors = useColors()
    const { address } = useAddress()
    const { order } = useOrder()
    const { cart, total } = useCart()

    const deadline = DateTime.local()
        .plus({
            minutes: cart.reduce((minutes, product) => {
                return minutes + product.preparation * product.quantity
            }, 0),
        })
        .toJSDate()
    const timer = useTimer({ expiryTimestamp: deadline })
    const api = useApi()

    

    const button_style = { padding: "1vw 7vw", gap: "5vw", justifyContent: "flex-start", fontSize: "4vw" }
    const icon_style = { width: "7vw", height: "auto" }

    useEffect(() => {
        const data = {
            products: cart,
            total,
            cep: address?.cep,
        }

        console.log(data)

        if (order?.delivery) {
            api.delivery.quotation({
                data,
                callback: (response: any) => {
                    console.log(response.data)
                },
            })
        }
    }, [])

    return (
        <div className="Finish-Component">
            <CheckCircleIcon sx={{ color: colors.blue, width: "15vw", height: "auto" }} />
            <h1>Pagamento Confirmado!</h1>

            {order?.delivery ? (
                <Button style={button_style}>
                    <DeliveryIcon style={icon_style} />
                    Acompanhar pedido
                </Button>
            ) : (
                <>
                    <p style={{ fontWeight: "bold", width: "80%" }}>Você pode retirar o pedido em até</p>
                    <Button style={button_style}>
                        <TimerIcon sx={icon_style} />
                        {timer.days.toString().padStart(2, "0")} : {timer.hours.toString().padStart(2, "0")} :{" "}
                        {timer.minutes.toString().padStart(2, "0")}: {timer.seconds.toString().padStart(2, "0")}
                    </Button>
                </>
            )}
        </div>
    )
}
