import React from "react"
import "./style.scss"
import { Button } from "../../components/Button"
import { useColors } from "../../hooks/useColors"
import { Route, Routes, useLocation, useNavigate } from "react-router-dom"
import { Review } from "./Review"
import { Address } from "./Address"
import { Payment } from "./Payment"

interface CheckoutProps {}

export const Checkout: React.FC<CheckoutProps> = ({}) => {
    const navigate = useNavigate()
    const colors = useColors()
    const location = useLocation()

    return (
        <div className="Checkout-Page">
            <div className="cancel-container">
                <h4>Finalização de compra</h4>
                <Button
                    onClick={() => navigate(location.pathname == "/checkout" ? "/cart" : "/checkout")}
                    style={{ color: colors.purple, boxShadow: "none", background: "white" }}
                >
                    {location.pathname == "/checkout" ? "Cancelar" : "Voltar"}
                </Button>
            </div>
            <div className="main-container">
                <Routes>
                    <Route index element={<Review />} />
                    <Route path="address" element={<Address />} />
                    <Route path="payment" element={<Payment />} />
                </Routes>
            </div>
        </div>
    )
}