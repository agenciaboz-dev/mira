import React from "react"
import "./style.scss"
import { Button } from "../../components/Button"
import { useColors } from "../../hooks/useColors"
import { Route, Routes, useNavigate } from "react-router-dom"

interface CheckoutProps {}

export const Checkout: React.FC<CheckoutProps> = ({}) => {
    const navigate = useNavigate()
    const colors = useColors()

    return (
        <div className="Checkout-Page">
            <div className="cancel-container">
                <h4>Finalização de compra</h4>
                <Button
                    onClick={() => navigate("/cart")}
                    style={{ color: colors.purple, boxShadow: "none", background: "white" }}
                >
                    Cancelar
                </Button>
            </div>
            <div className="main-container">
                <Routes>
                    <Route index />
                </Routes>
            </div>
        </div>
    )
}
