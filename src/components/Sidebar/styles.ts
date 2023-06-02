import colors from "../../colors"
import { SxProps } from "@mui/material"

interface Styles {
    body: SxProps
    logo: React.CSSProperties
    menu: SxProps
}

const styles: Styles = {
    body: {
        flexDirection: "column",
        backgroundColor: colors.primary,
        color: colors.background,
        padding: "1vw 0",
        width: "20vw",
        alignItems: "center",
        flexShrink: 0,
    },

    logo: {
        width: "50%",
        height: "auto",
        borderRadius: "100%",
        padding: "1vw",
        margin: "2vw 0",
        backgroundColor: "white",
    },

    menu: {
        width: "100%",
        gap: "1.5vw",
        paddingLeft: "1vw",
    },
}

export default styles
