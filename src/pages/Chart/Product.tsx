import React, { useState } from "react"
import { CurrencyText } from "../../components/CurrencyText"
import { Product as ProductType } from "../../definitions/product"
import { ReactComponent as TrashIcon } from "../../images/trash.svg"

interface ProductProps {
    product: ProductType
}

export const Product: React.FC<ProductProps> = ({ product }) => {
    const [quantity, setQuantity] = useState("0")

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
            <TrashIcon style={{ marginLeft: "auto" }} />
        </div>
    )
}
