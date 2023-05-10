import Button from "@mui/material/Button"
import Paper from "@mui/material/Paper"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ProductModal } from "../../../components/ProductModal"
import { Product as ProductType } from "../../../definitions/product"
import { useProducts } from "../../../hooks/useProducts"
import { useUser } from "../../../hooks/useUser"
import { Product } from "./Product"
import "./style.scss"

interface DashboardProps {}

export const Dashboard: React.FC<DashboardProps> = ({}) => {
    const { user } = useUser()
    const navigate = useNavigate()
    const { products } = useProducts()

    const [productModal, setProductModal] = useState(false)
    const [product, setProduct] = useState<ProductType>()

    useEffect(() => {
        if (!user) navigate("/adm")
    }, [])

    useEffect(() => {
        if (product) {
            setProductModal(true)
        }
    }, [product])
    return (
        <div className="Dashboard-Component">
            <h2>Olá, {user?.name}</h2>
            <Paper elevation={5} className="product-list">
                {products.map((product) => (
                    <Product key={product.id} product={product} setProduct={setProduct} />
                ))}
            </Paper>
            <Button variant="contained" sx={{ width: "50vw" }} onClick={() => setProductModal(true)}>
                Adicionar produto
            </Button>

            <ProductModal open={productModal} setOpen={setProductModal} product={product} />
        </div>
    )
}
