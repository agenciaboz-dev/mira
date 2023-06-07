import { SxProps } from "@mui/material"

interface Styles {
    dialog: SxProps
    paper: SxProps
    body: SxProps
    title: SxProps
    input: SxProps
    footer: SxProps
    radio: SxProps
    services: SxProps
}

const styles: Styles = {
    dialog: {
        flexDirection: "column",
    },

    paper: {
        flexDirection: "column",
        width: "87vw",
        height: "168vw",
        borderRadius: "7vw",
        position: "absolute",
        bottom: "17vw",
    },

    body: {
        flexDirection: "column",
        padding: "0 3vw 5vw 3vw ",
        height: "2vw",
    },

    title: {
        fontWeight: "700",
        fontSize: "4.3vw",
        color: "#555555",
    },

    input: {
        padding: "1vw",
        position: "absolute",
        right: "3.5vw",
        width: "80vw",
    },

    footer: {
        display: "flex",
        flexDirection: "column",
        position: "absolute",
        top: "132vw",
        gap: "4vw",
        padding: "1vw",
    },

    radio: {
        flexDirection: "column",
        gap: "2vw",
        position: "relative",
        left: "1vw",
        top: "25vw",
    },
    services: {
        flexDirection: "column",
        padding: "1vw",
    },
}

export default styles
