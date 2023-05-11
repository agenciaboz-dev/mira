import React from "react"
import { Product as ProductType } from "../../../definitions/product"
import EditIcon from "@mui/icons-material/Edit"
import { IconButton, Paper } from "@mui/material"
import { CurrencyText } from "../../../components/CurrencyText"

interface ProductProps {
    product: ProductType
    setProduct: (product: ProductType) => void
}

export const Product: React.FC<ProductProps> = ({ product, setProduct }) => {
    return (
        <Paper className="Product-Component">
            <div className="info-container">
                <h3>{product.name}</h3>
                <CurrencyText value={product.price} />
                <h3>{product.stock}</h3>
            </div>
            <IconButton onClick={() => setProduct(product)}>
                <EditIcon color="primary" />
            </IconButton>
        </Paper>
    )
}
