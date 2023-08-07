import colors from "../../../colors"
import { SxProps } from "@mui/material"

interface Styles {
    body: SxProps
    list: SxProps
    header: SxProps
    formContainer: SxProps
    inputContainer: SxProps
}

const styles: Styles = {
    body: {
        flexDirection: "column",
        width: "100%",
        padding: "1vw",
        gap: "1vw",
    },

    list: {
        padding: "1vw",
        flexDirection: "column",
        gap: "1vw",
        height: "90.5%",
    },

    header: {
        position: "sticky",
        top: "0",
        backgroundColor: "white",
        zIndex: 2,
        gap: "1vw",
        alignItems: "center",
        justifyContent: "space-between",
    },

    formContainer: {
        flexDirection: "column",
        gap: "1vw",
        width: "100%",
    },

    inputContainer: {
        gap: "1vw",
    },
}

export default styles
