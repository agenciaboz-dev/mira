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
        <div className="FinishContainer-Component" onClick={() => navigate("/checkout")}>
            <p>
                {cart.length || "Nenhum"} {cart.length > 1 ? "itens" : "item"} no carrinho
            </p>

            <div className="total-container">
                <h3>Total:</h3>
                <CurrencyText value={total} />
            </div>
            <Button style={{ fontSize: "4vw", fontWeight: "bold", padding: "1vw 3vw" }}>Finalizar Compra</Button>
        </div>
    )
}
