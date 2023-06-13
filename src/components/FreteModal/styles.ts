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
        width: "87vw",
        height: "75%",
        borderRadius: "4vw",
        backgroundColor: "white",
        border: "1px solid $dark_grey",
        boxShadow: "2px 8px 0px #1A7FB7",
        flexDirection: "column",
        gap: "1vw",
    },

    body: {
        flexDirection: "column",
        padding: "0 5vw 5vw",
        height: "100%",
        overflowX: "hidden",
        gap: "2vw",
    },

    title: {
        fontWeight: "700",
        fontSize: "4.3vw",
        color: "#555555",
        paddingLeft: "6vw",
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
