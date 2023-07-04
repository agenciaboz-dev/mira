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
        <div className="FinishContainer-Component">
            <p>
                {cart.length || "Nenhum"} {cart.length > 1 ? "itens" : "item"} no carrinho
            </p>

            <div className="total-container">
                <h3>Total:</h3>
                <CurrencyText value={total} />
            </div>
            <Button
                style={{
                    fontSize: "4vw",
                    fontWeight: "bold",
                    padding: "2vw 3vw",
                    background: !cart.length ? "linear-gradient(90deg, #9F9F9F 0%, #565656 91.94%)" : "",
                    boxShadow: !cart.length ? "none" : "",
                }}
                disabled={!cart.length}
                onClick={() => navigate("/checkout")}
            >
                Finalizar Compra
            </Button>
        </div>
    )
}
