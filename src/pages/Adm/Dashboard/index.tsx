import Button from "@mui/material/Button"
import Paper from "@mui/material/Paper"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useProducts } from "../../../hooks/useProducts"
import { useUser } from "../../../hooks/useUser"
import "./style.scss"
import { Box } from "@mui/material"
import styles from "./styles"

interface DashboardProps {}

export const Dashboard: React.FC<DashboardProps> = ({}) => {
    const { user } = useUser()
    const navigate = useNavigate()
    const { products } = useProducts()

    const [productModal, setProductModal] = useState(false)
    const [product, setProduct] = useState<Product>()

    useEffect(() => {
        if (!user) navigate("/adm")
    }, [])

    useEffect(() => {
        if (product) {
            setProductModal(true)
        }
    }, [product])
    return (
        <>
            <Box sx={styles.body}></Box>
        </>
    )
}
