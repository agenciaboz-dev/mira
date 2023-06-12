import { SxProps } from "@mui/material"

interface Styles {
    dialog: SxProps
    paper: SxProps
    body: SxProps
    title: SxProps
    input: SxProps
    footer: SxProps
    services: SxProps
}

const styles: Styles = {
    dialog: {
        alignItems: "center",
        justifyContent: "center",
    },
    
    paper: {
        flexDirection: "column",
        width: "87vw",
        height: "75%",
        borderRadius: "7vw",
        border: "1px solid #555555",
        boxShadow: "2px 8px 0px #1A7FB7",
    },

    body: {
        flexDirection: "column",
        padding: "0 5vw 5vw",
        height: "100%",
        overflowX: "hidden",
        gap: "5vw",
    },

    title: {
        fontWeight: "700",
        fontSize: "4.3vw",
        color: "#555555",
    },
    
    input: {
        padding: "1vw",
        width: "80vw",
    },

    footer: {
        display: "flex",
        flexDirection: "column",
        gap: "4vw",
        padding: "1vw",
        marginTop: "auto",
    },

    services: {
        flexDirection: "column",
        gap: "5vw",
    },
}

export default styles
