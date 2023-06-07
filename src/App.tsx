import { Alert, ThemeProvider } from "@mui/material"
import React, { useContext, useEffect } from "react"
import { Route, Routes } from "react-router"
import { BrowserRouter } from "react-router-dom"
import { CartProvider } from "./contexts/cartContext"
import { ProductsProvider } from "./contexts/productsContext"
import { SnackbarProvider } from "./contexts/snackbarContext"
import { UserProvider } from "./contexts/userContext"
import { useMuiTheme } from "./hooks/useMuiTheme"
import { Camera } from "./pages/Camera"
import { Cart } from "./pages/Cart"
import { Login } from "./pages/Login"
import { Product } from "./pages/Product"
import { Profile } from "./pages/Profile"
import "./sass/_all.scss"
import { Snackbar } from "./components/Snackbar"
import { Checkout } from "./pages/Checkout"
import { AddressProvider } from "./contexts/addressContext"
import { OrdersProvider } from "./contexts/orderContext"
import { Review } from "./pages/Review"

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
                                            <Route index element={<Login />} />
                                            <Route path="/*" element={<Login />} />
                                            <Route path="/login/*" element={<Login />} />
                                            <Route path="/cart" element={<Cart />} />
                                            <Route path="/scan" element={<Camera />} />
                                            <Route path="/profile/*" element={<Profile />} />
                                            <Route path="/checkout/*" element={<Checkout />} />
                                            <Route path="/review" element={<Review />} />
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
