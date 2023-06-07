import { SxProps } from "@mui/material"

interface Styles {
    dialog: SxProps
    body: SxProps
    title: SxProps
}

const styles: Styles = {
    dialog: {
        flexDirection: "column",
    },

    body: {
        flexDirection: "column",
    },
    title: {},
}

export default styles
