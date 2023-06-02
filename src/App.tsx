import { Alert, ThemeProvider } from "@mui/material"
import React, { useContext, useEffect } from "react"
import { Route, Routes } from "react-router"
import { BrowserRouter } from "react-router-dom"
import { CartProvider } from "./contexts/cartContext"
import { ProductsProvider } from "./contexts/productsContext"
import { SnackbarProvider } from "./contexts/snackbarContext"
import { UserProvider } from "./contexts/userContext"
import { useMuiTheme } from "./hooks/useMuiTheme"
import { Adm } from "./pages/Adm"
import "./sass/_all.scss"
import { Snackbar } from "./components/Snackbar"
import { AddressProvider } from "./contexts/addressContext"
import { OrdersProvider } from "./contexts/ordersContext"
import { Login } from "./pages/Adm/Login"

function App() {
    const muiTheme = useMuiTheme()

    return (
        <ThemeProvider theme={muiTheme}>
            <SnackbarProvider>
                <OrdersProvider>
                    <UserProvider>
                        <ProductsProvider>
                            <CartProvider>
                                <AddressProvider>
                                    <BrowserRouter>
                                        <Snackbar />
                                        <Routes>
                                            <Route index element={<Adm />} />
                                            <Route path="/*" element={<Adm />} />
                                            <Route path="/login" element={<Login />} />
                                        </Routes>
                                    </BrowserRouter>
                                </AddressProvider>
                            </CartProvider>
                        </ProductsProvider>
                    </UserProvider>
                </OrdersProvider>
            </SnackbarProvider>
        </ThemeProvider>
    )
}

export default App
