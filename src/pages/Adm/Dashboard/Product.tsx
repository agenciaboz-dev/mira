import React from "react"
import { Product as ProductType } from "../../../definitions/product"

interface ProductProps {
    product: ProductType
}

export const Product: React.FC<ProductProps> = ({ product }) => {
    return (
        <div className="Product-Component">
            <h3>{product.name}</h3>
        </div>
    )
}
