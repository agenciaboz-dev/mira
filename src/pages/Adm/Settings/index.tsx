import { Paper } from "@mui/material"
import React from "react"
import { ProfitMargin } from "./ProfitMargin"
import styles from "./styles"
import { ReloadPage } from "./ReloadPage"
import { ImportProducts } from "./ImportProducts"

interface SettingsProps {}

export const Settings: React.FC<SettingsProps> = ({}) => {
    return (
        <Paper sx={styles.body} elevation={5}>
            <ProfitMargin />
            <ReloadPage />
            <ImportProducts />
        </Paper>
    )
}
