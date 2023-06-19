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
    const navigate = useNavigate()

    const { cart, total } = useCart()
    const { setOrder } = useOrder()
    const { setAddress } = useAddress()

    const [openFreteModal, setOpenFreteModal] = useState(false)

    const button_style = { fontSize: "4vw", justifyContent: "flex-start", padding: "1.5vw 5vw", gap: "10vw" }
    const icon_style = { height: "100%", width: "13%" }

    useEffect(() => {
        setOrder(undefined)
    }, [])

    return (
        <div className="Review-Component">
            <h2 style={{ fontWeight: "normal" }}>
                {cart.length || "Nenhum"} {cart.length > 1 ? "itens" : "item"} no carrinho
            </h2>
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
                                    Total: <CurrencyText value={Number(product.price) * product.quantity} />
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="totals-container">
                <p>
                    Subtotal de itens: <CurrencyText value={total} />
                </p>
                <Button
                    fullWidth
                    style={button_style}
                    onClick={() => {
                        setAddress(undefined)
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
            </div>
            <FreteModal open={openFreteModal} setOpen={setOpenFreteModal} />
        </div>
    )
}
