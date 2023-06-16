import { SxProps } from "@mui/material"

interface Styles {
    dialog: SxProps
    paper: SxProps
    body: SxProps
    title: SxProps
}

const styles: Styles = {
    dialog: {
        alignItems: "center",
        justifyContent: "center",
    },

    paper: {
        flexDirection: "column",
        borderRadius: "3vw",
        backgroundColor: "white",
        border: "1px solid $dark_grey",
        boxShadow: "2px 8px 0px #1A7FB7",
        gap: "1vw",
    },

    body: {
        flexDirection: "column",
        padding: "0 5vw 5vw",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        overflowX: "hidden",
        gap: "5vw",
    },

    title: {
        fontWeight: "700",
        fontSize: "4.3vw",
        color: "#555555",
        paddingLeft: "5.5vw",
    },
}

export default styles
