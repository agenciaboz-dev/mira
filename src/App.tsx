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
import { Snackbar } from "burgos-snackbar"
import { ConfirmDialogProvider, ConfirmDialog } from "burgos-confirm"
import { AddressProvider } from "./contexts/addressContext"
import { OrdersProvider } from "./contexts/ordersContext"
import { Login } from "./pages/Adm/Login"
import { CurrentProductProvider } from "./contexts/currentProductContext"

function App() {
    const muiTheme = useMuiTheme()

    return (
        <ThemeProvider theme={muiTheme}>
            <ConfirmDialogProvider>
                <SnackbarProvider>
                    <OrdersProvider>
                        <UserProvider>
                            <CurrentProductProvider>
                                <ProductsProvider>
                                    <CartProvider>
                                        <AddressProvider>
                                            <BrowserRouter>
                                                <Snackbar />
                                                <ConfirmDialog />
                                                <Routes>
                                                    <Route index element={<Login />} />
                                                    <Route path="/dashboard/*" element={<Adm />} />
                                                    <Route path="/login" element={<Login />} />
                                                </Routes>
                                            </BrowserRouter>
                                        </AddressProvider>
                                    </CartProvider>
                                </ProductsProvider>
                            </CurrentProductProvider>
                        </UserProvider>
                    </OrdersProvider>
                </SnackbarProvider>
            </ConfirmDialogProvider>
        </ThemeProvider>
    )
}

export default App
