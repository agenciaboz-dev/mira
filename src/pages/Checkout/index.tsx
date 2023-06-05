import React, { useEffect } from "react"
import "./style.scss"
import { IconButton } from "@mui/material"
import { useColors } from "../../hooks/useColors"
import { Route, Routes, useLocation, useNavigate } from "react-router-dom"
import { Review } from "./Review"
import { Address } from "./Address"
import { Payment } from "./Payment"
import { Pix } from "./Pix"
import { Finish } from "./Finish"
import { useUser } from "../../hooks/useUser"
import CancelIcon from '@mui/icons-material/Cancel';
import { Order } from "./Order"

interface CheckoutProps {}

export const Checkout: React.FC<CheckoutProps> = ({}) => {
    const navigate = useNavigate()
    const colors = useColors()
    const location = useLocation()

    return (
        <div className="Checkout-Page">
            <img src="/promotions.png" alt="Promoções" />
            <div className="main-container">
                <IconButton onClick={() => navigate("/cart")} sx={{ position: "absolute", right: "1vw", top: "1vw" }}>
                    <CancelIcon color="error" sx={{ width: "5vw", height: "auto" }} />
                </IconButton>
                <Routes>
                    <Route index element={<Review />} />
                    <Route path="address" element={<Address />} />
                    <Route path="payment" element={<Payment />} />
                    <Route path="pix" element={<Pix />} />
                    <Route path="order" element={<Order />} />
                    <Route path="finish" element={<Finish />} />
                </Routes>
            </div>
        </div>
    )
}
