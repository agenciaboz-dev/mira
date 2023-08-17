import { SxProps } from "@mui/material"

interface Styles {
    body: SxProps
    list: SxProps
    title: SxProps
    buttons: SxProps
}

const styles: Styles = {
    body: {
        position: "relative",
        flexDirection: "column",
        width: "100%",
        padding: "7vw",
        backgroundImage: 'url("/bricks_webp.webp")',
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        gap: "5vw",
    },

    list: {
        flexDirection: "column",
        gap: "5vw",
        paddingBottom: "20vw",
        maxHeight: "85vh",
        overflowY: "auto",
    },

    title: {
        border: "1px solid grey",
        padding: "1.5vw",
        boxShadow: "2px 8px 0px #1a7fb7",
        borderRadius: "15vw",
        background: "white",
        justifyContent: "center",
        color: "#505050",
    },

    buttons: {
        position: "absolute",
        bottom: 0,
        left: 0,
        justifyContent: "space-between",
        boxShadow: "2px -8px 0px #1a7fb7",
        borderTopRightRadius: "5vw",
        borderTopLeftRadius: "5vw",
        padding: "5vw 2vw",
        width: "100%",
        background: "white",
    },
}

export default styles
