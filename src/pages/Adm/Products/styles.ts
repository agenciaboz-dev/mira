import colors from "../../../colors"
import { SxProps } from "@mui/material"

interface Styles {
    body: SxProps
    list: SxProps
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
    },
}

export default styles
