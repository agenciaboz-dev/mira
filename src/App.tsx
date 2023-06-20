import { ThemeProvider } from "@mui/material"
import { Route, Routes } from "react-router"
import { BrowserRouter } from "react-router-dom"
import { ProductsProvider } from "./contexts/productsContext"
import { UserProvider } from "./contexts/userContext"
import { useMuiTheme } from "./hooks/useMuiTheme"
import { Adm } from "./pages/Adm"
import "./sass/_all.scss"
import { Snackbar, SnackbarProvider } from "burgos-snackbar"
import { ConfirmDialogProvider, ConfirmDialog } from "burgos-confirm"
import { Login } from "./pages/Adm/Login"
import { CurrentProductProvider } from "./contexts/currentProductContext"
import { CategoriesProvider } from "./contexts/categoriesContext"
import { CurrentCategoryProvider } from "./contexts/currentCategoryContext"
import { SuppliersProvider } from "./contexts/suppliersContext"
import { CurrentSupplierProvider } from "./contexts/currentSupplierContext"
import { OrdersProvider } from "./contexts/ordersContext"
import { WebsocketProvider } from "./contexts/websocketContext"

function App() {
    const muiTheme = useMuiTheme()

    return (
        <ThemeProvider theme={muiTheme}>
            <ConfirmDialogProvider>
                <SnackbarProvider>
                    <UserProvider>
                        <CurrentSupplierProvider>
                            <CurrentCategoryProvider>
                                <CurrentProductProvider>
                                    <SuppliersProvider>
                                        <CategoriesProvider>
                                            <ProductsProvider>
                                                <OrdersProvider>
                                                    <BrowserRouter>
                                                        <WebsocketProvider>
                                                            <Snackbar />
                                                            <ConfirmDialog />
                                                            <Routes>
                                                                <Route index element={<Login />} />
                                                                <Route path="/dashboard/*" element={<Adm />} />
                                                                <Route path="/login" element={<Login />} />
                                                            </Routes>
                                                        </WebsocketProvider>
                                                    </BrowserRouter>
                                                </OrdersProvider>
                                            </ProductsProvider>
                                        </CategoriesProvider>
                                    </SuppliersProvider>
                                </CurrentProductProvider>
                            </CurrentCategoryProvider>
                        </CurrentSupplierProvider>
                    </UserProvider>
                </SnackbarProvider>
            </ConfirmDialogProvider>
        </ThemeProvider>
    )
}

export default App
