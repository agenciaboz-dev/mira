import { Alert, ThemeProvider } from "@mui/material"
import React, { useContext, useEffect } from "react"
import { Route, Routes } from "react-router"
import { BrowserRouter } from "react-router-dom"
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
import { Review } from "./pages/Review"
import { ScrollTop } from "./components/ScrollTop"
import { ProductList } from "./pages/ProductList"
import { Download } from "./pages/Download"
import { Password } from "./pages/Password"
import { WildCard } from "./pages/WildCard"
import { Redirect } from "./pages/Redirect"
import { PrivacyPolicy } from "./pages/PrivacyPolicy"
import { ConfirmDialog, ConfirmDialogProvider } from "burgos-confirm"

function App() {
    const muiTheme = useMuiTheme()

    return (
        <ThemeProvider theme={muiTheme}>
            <BrowserRouter>
                <SnackbarProvider>
                    <ConfirmDialogProvider>
                        <OrdersProvider>
                            <UserProvider>
                                <ProductsProvider>
                                    <CartProvider>
                                        <AddressProvider>
                                            <ScrollTop />
                                            <Snackbar />
                                            <ConfirmDialog />
                                            <Routes>
                                                <Route index element={<Login />} />
                                                <Route path="/login/*" element={<Login />} />
                                                <Route path="/download" element={<Download />} />
                                                <Route path="/cart" element={<Cart />} />
                                                <Route path="/scan" element={<Camera />} />
                                                <Route path="/profile/*" element={<Profile />} />
                                                <Route path="/checkout/*" element={<Checkout />} />
                                                <Route path="/review" element={<Review />} />
                                                <Route path="/products" element={<ProductList />} />
                                                <Route path="/password/*" element={<Password />} />
                                                <Route path="/redirect" element={<Redirect />} />
                                                <Route path="/privacypolicy/:lang?" element={<PrivacyPolicy />} />
                                                <Route path="*" element={<WildCard />} />
                                            </Routes>
                                        </AddressProvider>
                                    </CartProvider>
                                </ProductsProvider>
                            </UserProvider>
                        </OrdersProvider>
                    </ConfirmDialogProvider>
                </SnackbarProvider>
            </BrowserRouter>
        </ThemeProvider>
    )
}

export default App
