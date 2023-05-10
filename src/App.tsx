import { ThemeProvider } from "@mui/material"
import React from "react"
import { Route, Routes } from "react-router"
import { BrowserRouter } from "react-router-dom"
import { CartProvider } from "./contexts/cartContext"
import { ProductsProvider } from "./contexts/productsContext"
import { UserProvider } from "./contexts/userContext"
import { useMuiTheme } from "./hooks/useMuiTheme"
import { Adm } from "./pages/Adm"
import { Camera } from "./pages/Camera"
import { Cart } from "./pages/Cart"
import { Login } from "./pages/Login"
import { Product } from "./pages/Product"
import "./sass/_all.scss"

function App() {
    const muiTheme = useMuiTheme()
    return (
        <ThemeProvider theme={muiTheme}>
            <UserProvider>
                <ProductsProvider>
                    <CartProvider>
                        <BrowserRouter>
                            <Routes>
                                <Route index element={<Login />} />
                                <Route path="/*" element={<Login />} />
                                <Route path="/login/*" element={<Login />} />
                                <Route path="/adm/*" element={<Adm />} />
                                <Route path="/cart" element={<Cart />} />
                                <Route path="/scan" element={<Camera />} />
                                <Route path="/product/:id" element={<Product />} />
                                <Route path="/product/:id/:buying" element={<Product />} />
                            </Routes>
                        </BrowserRouter>
                    </CartProvider>
                </ProductsProvider>
            </UserProvider>
        </ThemeProvider>
    )
}

export default App
