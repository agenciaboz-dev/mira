import { Alert, ThemeProvider } from "@mui/material"
import React, { useContext, useEffect, useState } from "react"
import { Route, Routes } from "react-router"
import { BrowserRouter, useLocation, useNavigate } from "react-router-dom"
import { CartProvider } from "./contexts/cartContext"
import { ProductsProvider } from "./contexts/productsContext"
import { SnackbarProvider } from "burgos-snackbar"
import { UserProvider } from "./contexts/userContext"
import { useMuiTheme } from "./hooks/useMuiTheme"
import { Camera } from "./pages/Camera"
import { Cart } from "./pages/Cart"
import { Login } from "./pages/Login"
import { Product } from "./pages/Product"
import { Profile } from "./pages/Profile"
import "./sass/_all.scss"
import { Snackbar } from "burgos-snackbar"
import { Checkout } from "./pages/Checkout"
import { AddressProvider } from "./contexts/addressContext"
import { OrdersProvider } from "./contexts/orderContext"
import { useIdleTimer } from "react-idle-timer"
import { TimeoutPrompt } from "./components/TimeoutPrompt"
import { useReset } from "./hooks/useReset"
import { ProdutList } from "./pages/ProductList"
import { Download } from "./pages/Download"
import { Password } from "./pages/Password"
import { Review } from "./pages/Checkout/Review"

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
                                            <Route path="/download" element={<Download />} />
                                            <Route path="/cart" element={<Cart />} />
                                            <Route path="/scan" element={<Camera />} />
                                            <Route path="/profile/*" element={<Profile />} />
                                            <Route path="/checkout/*" element={<Checkout />} />
                                            <Route path="/review" element={<Review />} />
                                            <Route path="/products" element={<ProdutList />} />
                                            <Route path="/password/*" element={<Password />} />
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
