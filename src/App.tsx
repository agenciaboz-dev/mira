import { ThemeProvider } from "@mui/material"
import React from "react"
import { Route, Routes } from "react-router"
import { BrowserRouter } from "react-router-dom"
import { ProductsProvider } from "./contexts/productsContext"
import { useMuiTheme } from "./hooks/useMuiTheme"
import { Camera } from "./pages/Camera"
import { Login } from "./pages/Login"
import "./sass/_all.scss"

function App() {
    const muiTheme = useMuiTheme()
    return (
        <ThemeProvider theme={muiTheme}>
            <ProductsProvider>
                <BrowserRouter>
                    <Routes>
                        <Route index element={<Login />} />
                    </Routes>
                </BrowserRouter>
            </ProductsProvider>
        </ThemeProvider>
    )
}

export default App
