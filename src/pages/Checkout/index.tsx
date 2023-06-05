import React, { useEffect } from "react"
import "./style.scss"
import { Button } from "../../components/Button"
import { useColors } from "../../hooks/useColors"
import { Route, Routes, useLocation, useNavigate } from "react-router-dom"
import { Review } from "./Review"
import { Address } from "./Address"
import { Payment } from "./Payment"
import { Pix } from "./Pix"
import { Finish } from "./Finish"
import { useUser } from "../../hooks/useUser"
import { Order } from "./Order"

interface CheckoutProps {}

export const Checkout: React.FC<CheckoutProps> = ({}) => {
    const navigate = useNavigate()
    const colors = useColors()
    const location = useLocation()
    const { user } = useUser()

    useEffect(() => {
        if (!user) navigate("/login")
    }, [])

    return (
        <div className="Checkout-Page">
            {!!user && (
                <>
                    <div className="cancel-container">
                        <h4>Finalização de compra</h4>
                        <Button
                            onClick={() => navigate(location.pathname == "/checkout" ? "/cart" : "/checkout")}
                            style={{
                                color: colors.purple,
                                boxShadow: "none",
                                background: "white",
                                padding: "0.5vw 2vw",
                                fontSize: "2.5vw",
                            }}
                        >
                            {location.pathname == "/checkout" ? "Cancelar" : "Voltar"}
                        </Button>
                    </div>
                    <div className="main-container">
                        <Routes>
                            <Route index element={<Review />} />
                            <Route path="address" element={<Address />} />
                            <Route path="payment" element={<Payment />} />
                            <Route path="pix" element={<Pix />} />
                            <Route path="order" element={<Order />} />
                            <Route path="finish" element={<Finish />} />
                        </Routes>
                    </div>
                </>
            )}
        </div>
    )
}
