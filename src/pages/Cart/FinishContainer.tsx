import React from "react"
import { Button } from "../../components/Button"
import { CurrencyText } from "../../components/CurrencyText"
import { useCart } from "../../hooks/useCart"
import { useNavigate } from "react-router-dom"

interface FinishContainerProps {}

export const FinishContainer: React.FC<FinishContainerProps> = ({}) => {
    const { cart, total } = useCart()
    const navigate = useNavigate()

    return (
        <div className="FinishContainer-Component" onClick={() => navigate("/review")}>
            <p>
                {cart.length || "Nenhum"} {cart.length > 1 ? "itens" : "item"} no carrinho
            </p>

            <div className="total-container">
                <h3>Total:</h3>
                <CurrencyText value={total} style={{ fontSize: "6vw" }} />
            </div>
            <Button style={{ fontSize: "4vw", fontWeight: "bold", padding: "3vw" }}>Finalizar compra</Button>
        </div>
    )
}
