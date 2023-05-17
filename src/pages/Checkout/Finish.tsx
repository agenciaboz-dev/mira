import React from "react"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import { useColors } from "../../hooks/useColors"
import { useAddress } from "../../hooks/useAddress"
import { Button } from "../../components/Button"
import { ReactComponent as DeliveryIcon } from "../../images/checkout/delivery.svg"
import TimerIcon from "@mui/icons-material/Timer"
import { DateTime } from "luxon"
import { useTimer } from "react-timer-hook"

interface FinishProps {}

export const Finish: React.FC<FinishProps> = ({}) => {
    const colors = useColors()
    const { address } = useAddress()
    const deadline = DateTime.local().plus({ hours: 6, minutes: 30 }).toJSDate()
    const timer = useTimer({ expiryTimestamp: deadline })

    const button_style = { padding: "2vw 12vw", gap: "10vw", justifyContent: "flex-start" }
    const icon_style = { width: "7vw", height: "auto" }

    return (
        <div className="Finish-Component">
            <CheckCircleIcon sx={{ color: colors.blue, width: "15vw", height: "auto" }} />
            <h1>Pagamento Confirmado!</h1>

            {address?.delivery ? (
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
