import React, { useState } from "react"
import { useParams } from "react-router-dom"
import { Product as ProductType } from "../../definitions/product"
import { useProducts } from "../../hooks/useProducts"
import "./style.scss"
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded"
import IconButton from "@mui/material/IconButton"
import CancelIcon from "@mui/icons-material/Cancel"
import { useColors } from "../../hooks/useColors"
import { CurrencyText } from "../../components/CurrencyText"

interface ProductProps {}

export const Product: React.FC<ProductProps> = ({}) => {
    const params = useParams()
    const id = Number(params.id)
    const buying = params.buying

    const { products } = useProducts()
    const colors = useColors()

    const [product, setProduct] = useState(products.filter((item) => item.id == id)[0])
    const [expanded, setExpanded] = useState(false)

    return (
        <div className="Product-Page">
            <img className="image" src={product.image} alt={product.name} />
            <div className="main-container" style={{ minHeight: expanded ? "100%" : "55%" }}>
                <div className="title-container">
                    <h1>{product.name}</h1>
                    <IconButton onClick={() => setExpanded(!expanded)}>
                        <KeyboardArrowUpRoundedIcon
                            sx={{
                                height: "auto",
                                width: "15vw",
                                transition: "0.5s",
                                transform: expanded ? "rotate(180deg)" : "",
                            }}
                        />
                    </IconButton>
                    <IconButton sx={{ marginLeft: "auto" }}>
                        <CancelIcon sx={{ color: colors.red, width: "8vw", height: "auto" }} />
                    </IconButton>
                </div>
                <CurrencyText value={product.price} />
                <p>{product.description}</p>
            </div>
        </div>
    )
}
