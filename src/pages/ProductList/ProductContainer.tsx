import { Avatar, Box, IconButton, Paper } from "@mui/material"
import React from "react"
import { Product } from "../../definitions/product"
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout"
import { useNavigate } from "react-router-dom"

interface ProductContainerProps {
    product: Product
}

interface SpecsProps {
    title: string
    value: string
    alt?: boolean
}

const Specs: React.FC<SpecsProps> = ({ title, value, alt }) => {
    const paper_style = {
        alignItems: "center",
        backgroundColor: alt ? "#2494c221" : "white",
        padding: "1.5vw",
        gap: "1vw",
    }

    return (
        <Box sx={paper_style}>
            <h3 style={{ fontSize: "3vw", flex: "0.5" }}>{title}</h3>
            <p style={{ fontSize: "3vw", flex: "0.5" }}>{value}</p>
        </Box>
    )
}

export const ProductContainer: React.FC<ProductContainerProps> = ({ product }) => {
    const navigate = useNavigate()

    return (
        <Box
            sx={{
                flexDirection: "column",
                gap: "2vw",
                border: "1px solid grey",
                padding: "2vw",
                boxShadow: "2px 8px 0px #1a7fb7",
                borderRadius: "5vw",
                background: "white",
            }}
            onClick={() => navigate("/scan", { state: { product } })}
        >
            <Box sx={{ alignItems: "center", gap: "2vw" }}>
                <Avatar src={product.image} />
                <p style={{ width: "60vw", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {product.name}
                </p>
                <IconButton color="success">
                    <ShoppingCartCheckoutIcon />
                </IconButton>
            </Box>

            <Box sx={{ flexDirection: "column" }}>
                <Specs title="Fabricante" value={product.brand} />
                <Specs title="Dimensões" value={`${product.width}cm x ${product.height}cm x ${product.length}cm`} alt />
                <Specs title="Peso" value={`${product.weight} Kg`} />
                <Specs title="Preço" value={`R$ ${product.price}`} alt />
            </Box>
        </Box>
    )
}
