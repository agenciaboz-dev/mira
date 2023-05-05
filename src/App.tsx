import { ThemeProvider } from "@mui/material"
import React from "react"
import { Route, Routes } from "react-router"
import { BrowserRouter } from "react-router-dom"
import { useMuiTheme } from "./hooks/useMuiTheme"
import { Camera } from "./pages/Camera"
import "./sass/_all.scss"

function App() {
    const muiTheme = useMuiTheme()
    return (
        <ThemeProvider theme={muiTheme}>
            <BrowserRouter>
                <Routes>
                    <Route index element={<Camera />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    )
}

export default App
