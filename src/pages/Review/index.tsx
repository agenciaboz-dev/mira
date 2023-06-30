import React, { useState, useEffect } from "react"
import "./style.scss"
import { Button } from "../../components/Button"
import { useLocation, useNavigate } from "react-router-dom"
import { CircularProgress } from "@mui/material"
import Rating from '@mui/material/Rating';

import { useProducts } from "../../hooks/useProducts"
import { Product } from "./Product"
import { useCart } from "../../hooks/useCart"
import { useUser } from "../../hooks/useUser"
import { Order } from "../../definitions/cart"
import { useApi } from "../../hooks/useApi"

interface CartProps {}

export const Review = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const order:Order = useLocation().state.order
    const api = useApi()

    const apiCallback = () => {
        navigate("/cart") 
    }

    const handleCancelReview = () => {
        api.order.cancelReview({callback: apiCallback, data: {id: order.id}})
    }

    console.log({order})

    return <div className="Review-Page">
        <div className="title-container">
            <h2>Avaliação</h2>
        </div>

        <div className="product-list">
            {order.products.map((product) => (
                <Product key={product.product.id} product={product.product} />
            ))}
        </div>

        <div className="bottom-container">
            <p>Se desejar, avalie os produtos acima, referentes à sua última compra. Obrigado!</p>
            <div className="buttons-container">
                <Button onClick={() => handleCancelReview()} style={{ height: "10vw", width: "35vw", background: "linear-gradient(90deg, #9F9F9F 0%, #565656 91.94%)" }} >
                    Cancelar
                </Button>
                <Button type="submit" style={{ height: "10vw", width: "35vw", marginRight: "1vw" }}>
                    {loading ? (
                        <CircularProgress sx={{ color: "white" }} style={{ width: "6vw", height: "auto" }} />
                    ) : (
                        "Enviar"
                    )}
                </Button>
            </div>
        </div>
    </div>
}