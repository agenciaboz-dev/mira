import { Alert, Snackbar, ThemeProvider } from "@mui/material"
import React, { useContext } from "react"
import { Route, Routes } from "react-router"
import { BrowserRouter } from "react-router-dom"
import { CartProvider } from "./contexts/cartContext"
import { ProductsProvider } from "./contexts/productsContext"
import { SnackbarProvider } from "./contexts/snackbarContext"
import SnackbarContext from "./contexts/snackbarContext"
import { UserProvider } from "./contexts/userContext"
import { useMuiTheme } from "./hooks/useMuiTheme"
import { Adm } from "./pages/Adm"
import { Camera } from "./pages/Camera"
import { Cart } from "./pages/Cart"
import { Login } from "./pages/Login"
import { Product } from "./pages/Product"
import { Profile } from "./pages/Profile"
import "./sass/_all.scss"

function App() {
    const muiTheme = useMuiTheme()
    const snackbar = useContext(SnackbarContext)

    return (
        <ThemeProvider theme={muiTheme}>
            <SnackbarProvider>
                <Snackbar
                    open={snackbar.open}
                    autoHideDuration={3000}
                    onClose={() => snackbar.setOpen(false)}
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                >
                    <Alert onClose={() => snackbar.setOpen(false)} severity={snackbar.severity} sx={{ width: "100%" }}>
                        {snackbar.text}
                    </Alert>
                </Snackbar>
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
                                    <Route path="/profile/*" element={<Profile />} />
                                </Routes>
                            </BrowserRouter>
                        </CartProvider>
                    </ProductsProvider>
                </UserProvider>
            </SnackbarProvider>
        </ThemeProvider>
    )
}

export default App
