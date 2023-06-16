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
import { SplashScreen } from "./pages/SplashScreen"
import { OrdersProvider } from "./contexts/orderContext"
import { CategoriesProvider } from "./contexts/categoriesContext"
import { useIdleTimer } from "react-idle-timer"
import { TimeoutPrompt } from "./components/TimeoutPrompt"
import { useReset } from "./hooks/useReset"

const timeout = 240_000
const promptBeforeIdle = 120_000

const Container = () => {
    const location = useLocation()
    const reset = useReset()

    const [state, setState] = useState<string>("Active")
    const [remaining, setRemaining] = useState<number>(timeout)
    const [open, setOpen] = useState<boolean>(false)

    const onIdle = () => {
        if (location.pathname != "/" && location.pathname != "/login") {
            setState("Idle")
            setOpen(false)
            reset()
        }
    }

    const onActive = () => {
        setState("Active")
        setOpen(false)
    }

    const onPrompt = () => {
        if (location.pathname != "/" && location.pathname != "/login") {
            setState("Prompted")
            setOpen(true)
        }
    }

    const { getRemainingTime, activate } = useIdleTimer({
        onIdle,
        onActive,
        onPrompt,
        timeout,
        promptBeforeIdle,
        throttle: 500,
    })

    const handleStillHere = () => {
        activate()
    }

    useEffect(() => {
        console.log(state)
    }, [state])

    useEffect(() => {
        const interval = setInterval(() => {
            setRemaining(Math.ceil(getRemainingTime() / 1000))
        }, 500)

        return () => {
            clearInterval(interval)
        }
    })

    const timeTillPrompt = Math.max(remaining - promptBeforeIdle / 1000, 0)
    const seconds = timeTillPrompt > 1 ? "seconds" : "second"

    return (
        <>
            <TimeoutPrompt open={open} setActive={() => handleStillHere()} />
            <Routes>
                <Route index element={<SplashScreen />} />
                <Route path="/*" element={<Login />} />
                <Route path="/login/*" element={<Login />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/scan" element={<Camera />} />
                <Route path="/profile/*" element={<Profile />} />
                <Route path="/checkout/*" element={<Checkout />} />
            </Routes>
        </>
    )
}

function App() {
    const muiTheme = useMuiTheme()

    return (
        <ThemeProvider theme={muiTheme}>
            <BrowserRouter>
                <OrdersProvider>
                    <SnackbarProvider>
                        <UserProvider>
                            <CategoriesProvider>
                                <ProductsProvider>
                                    <CartProvider>
                                        <AddressProvider>
                                            <Snackbar />
                                            <Container />
                                        </AddressProvider>
                                    </CartProvider>
                                </ProductsProvider>
                            </CategoriesProvider>
                        </UserProvider>
                    </SnackbarProvider>
                </OrdersProvider>
            </BrowserRouter>
        </ThemeProvider>
    )
}

export default App
