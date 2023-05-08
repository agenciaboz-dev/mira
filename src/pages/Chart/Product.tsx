import { IconButton } from "@mui/material"
import React, { useState } from "react"
import { CurrencyText } from "../../components/CurrencyText"
import { Product as ProductType } from "../../definitions/product"
import { useChart } from "../../hooks/useChart"
import { ReactComponent as TrashIcon } from "../../images/trash.svg"

interface ProductProps {
    product: ProductType
}

export const Product: React.FC<ProductProps> = ({ product }) => {
    const [quantity, setQuantity] = useState("0")
    const { chart, setChart } = useChart()

    const removeProduct = () => {
        setChart(chart.filter((item) => item.id != product.id))
    }

    return (
        <div className="Product-Component">
            <div className="text-container">
                <p>
                    Produto: <span>{product.name}</span>
                </p>
                <p>
                    Quantidade: <input type="text" value={quantity} onChange={(event) => setQuantity(event.target.value)} />
                </p>
                <p>
                    Preço: <CurrencyText value={product.price} />
                </p>
            </div>
            <IconButton onClick={removeProduct} sx={{ marginLeft: "auto" }}>
                <TrashIcon />
            </IconButton>
        </div>
    )
}
