import React from "react"
import { Snackbar as MuiSnackbar, Alert } from "@mui/material"
import { useSnackbar } from "../../hooks/useSnackbar"

interface SnackbarProps {}

export const Snackbar: React.FC<SnackbarProps> = ({}) => {
    const snackbar = useSnackbar()

    return (
        <MuiSnackbar
            open={snackbar.open}
            autoHideDuration={3000}
            onClose={() => snackbar.setOpen(false)}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
            <Alert onClose={() => snackbar.setOpen(false)} severity={snackbar.severity} sx={{ width: "100%" }}>
                {snackbar.text}
            </Alert>
        </MuiSnackbar>
    )
}
