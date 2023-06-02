import { createTheme } from "@mui/material"
import colors from "../colors"

export const useMuiTheme = () => {
    const THEME = createTheme({
        typography: {
            //  "fontFamily": ["Poppins"].join(','),
            //  "fontSize": 14,
            //  "fontWeightLight": 300,
            //  "fontWeightRegular": 400,
            //  "fontWeightMedium": 500
        },
        palette: {
            // mode: 'dark',

            primary: {
                main: colors.primary,
            },
            secondary: {
                main: colors.secondary,
            },
            // text: {
            //     primary: colors.primary,
            //     // secondary: colors.primary,
            //     // disabled: colors.primary,
            // },
        },
    })

    return THEME
}
