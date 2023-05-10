import Paper from "@mui/material/Paper"
import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useProducts } from "../../../hooks/useProducts"
import { useUser } from "../../../hooks/useUser"
import { Product } from "./Product"
import "./style.scss"

interface DashboardProps {}

export const Dashboard: React.FC<DashboardProps> = ({}) => {
    const { user } = useUser()
    const navigate = useNavigate()
    const { products } = useProducts()

    useEffect(() => {
        if (!user) navigate("/adm")
    }, [])
    return (
        <div className="Dashboard-Component">
            <h2>Olá, {user?.name}</h2>
            <Paper elevation={5} className="product-list">
                {products.map((product) => (
                    <Product key={product.id} product={product} />
                ))}
            </Paper>
        </div>
    )
}
