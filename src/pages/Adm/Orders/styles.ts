import { SxProps } from "@mui/material"

interface Styles {
    body: SxProps
    header: SxProps
    mainContainer: SxProps
    paper: SxProps
}

const styles: Styles = {
    body: { flexDirection: "column", width: "100%", padding: "1vw", gap: "1vw", margin: "1vw" },
    header: {
        gap: "1vw",
        alignItems: "center",
    },
    mainContainer: {
        gap: "1vw",
        width: "100%",
    },
    paper: {
        flexDirection: "column",
        width: "100%",
        height: "80vh",
        overflowY: "auto",
        gap: "1vw",
        padding: "1vw",
    },
}

export default styles
