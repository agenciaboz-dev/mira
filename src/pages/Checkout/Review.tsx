import React, { useEffect, useState } from "react"
import { useCart } from "../../hooks/useCart"
import { CurrencyText } from "../../components/CurrencyText"
import { Button } from "../../components/Button"
import { ReactComponent as LocalIcon } from "../../images/checkout/local.svg"
import { ReactComponent as DeliveryIcon } from "../../images/checkout/delivery.svg"
import { useNavigate } from "react-router-dom"
import { useAddress } from "../../hooks/useAddress"
import { FreteModal } from "../../components/FreteModal"
import { useOrder } from "../../hooks/useOrder"

interface ReviewProps {}

export const Review: React.FC<ReviewProps> = ({}) => {
    const { cart, total } = useCart()
    const navigate = useNavigate()
    const { setOrder } = useOrder()

    const button_style = {
        fontSize: "2.5vw",
        justifyContent: "flex-start",
        padding: "1vw 4vw",
        background: !Boolean(cart.length) ? "linear-gradient(90deg, #9F9F9F 0%, #565656 91.94%)" : "",
        boxShadow: !Boolean(cart.length) ? "none" : "",
    }
    const icon_style = { width: "13%" }
    const button_p_style = { margin: "0 auto" }

    useEffect(() => {
        setOrder(undefined)
    }, [])

    return (
        <div className="Review-Component">
            <div className="review-component-upper-container">
                <h1 style={{ fontWeight: "normal" }}>
                    {cart.length || "Nenhum"} {cart.length > 1 ? "itens" : "item"} no carrinho
                </h1>
                <div className="product-list">
                    {cart.map((product) => (
                        <div className="product-container" key={product.id}>
                            <img className="image" src={product.image} alt={product.name} />
                            <div className="info-container">
                                <p>
                                    Produto: <span>{product.name}</span>
                                </p>
                                <p>
                                    Quantidade: <span>{product.quantity}</span>
                                </p>
                                <div className="price-container">
                                    <p>
                                        Custo: <CurrencyText value={product.price} />
                                    </p>
                                    <p>
                                        Total: <CurrencyText value={product.price * product.quantity} />
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="totals-container">
                <p>
                    Total do pedido (sem entrega): <CurrencyText value={total} />
                </p>
                <Button
                    fullWidth
                    style={button_style}
                    onClick={() => {
                        navigate("payment")
                    }}
                >
                    <LocalIcon style={icon_style} />
                    Retirada no local
                </Button>
                <Button fullWidth style={button_style} onClick={() => setOpenFreteModal(true)}>
                    <DeliveryIcon style={icon_style} />
                    Entrega
                </Button>
                <FreteModal open={openFreteModal} setOpen={setOpenFreteModal} />
            </div>
        </div>
    )
}
