import React from "react"
import { Product as ProductType } from "../../../definitions/product"
import EditIcon from "@mui/icons-material/Edit"
import { IconButton, Paper } from "@mui/material"

interface ProductProps {
    product: ProductType
    setProduct: (product:ProductType) => void
}

export const Product: React.FC<ProductProps> = ({ product, setProduct }) => {
    return (
        <Paper className="Product-Component">
            <h3>{product.name}</h3>
            <IconButton onClick={() => setProduct(product)}>
                <EditIcon color='primary' />
            </IconButton>
        </Paper>
    )
}
