import colors from "../../../colors"
import { SxProps } from "@mui/material"

interface Styles {
    body: SxProps
    actions: SxProps
    info: SxProps
}

const styles: Styles = {
    body: {
        width: "100%",
    },

    info: {
        width: "100%",
        alignItems: "center",
        padding: "1vw",
    },

    actions: {
        marginLeft: "auto",
    },
}

export default styles
