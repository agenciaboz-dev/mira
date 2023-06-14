import { SxProps } from "@mui/material"

interface Styles {
    body: SxProps
    header: SxProps
}

const styles: Styles = {
    body: { flexDirection: "column", width: "100%", padding: "1vw", gap: "1vw", margin: "1vw" },
    header: {
        gap: "1vw",
        alignItems: "center",
    },
}

export default styles
