import React, { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Product as ProductType } from "../../definitions/product"
import { Paper } from "@mui/material"
import { useProducts } from "../../hooks/useProducts"
import "./style.scss"
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded"
import IconButton from "@mui/material/IconButton"
import CancelIcon from "@mui/icons-material/Cancel"
import { useColors } from "../../hooks/useColors"
import { CurrencyText } from "../../components/CurrencyText"
import { styles } from "./styles"
import { ReactComponent as MinusIcon } from "../../images/product/minus.svg"
import { ReactComponent as PlusIcon } from "../../images/product/plus.svg"
import { TextField } from "../../components/TextField"
import { Button } from "../../components/Button"

interface ProductProps {}

export const Product: React.FC<ProductProps> = ({}) => {
    const params = useParams()
    const id = Number(params.id)
    const buying = params.buying

    const { products } = useProducts()
    const colors = useColors()
    const navigate = useNavigate()

    const [product, setProduct] = useState(products.filter((item) => item.id == id)[0])
    const [quantity, setQuantity] = useState(1)

    return (
        <div className="Product-Page">
            <img className="image" src={product.image} alt={product.name} />

            <IconButton
                sx={{ marginLeft: "auto", position: "absolute", top: "5vw", right: "5vw" }}
                onClick={() => navigate(-1)}
            >
                <CancelIcon sx={styles.cancel_icon} />
            </IconButton>

            <div className="title-container">
                <h1>{product.name}</h1>
                <CurrencyText value={product.price} style={{ fontSize: "7vw" }} />
            </div>
            <p>{product.description}</p>

            <div className="specs-container">
                <Paper sx={styles.paper}>
                    <h3>Dimensões</h3>
                    <p>18 X 27</p>
                </Paper>
                <Paper sx={styles.paper}>
                    <h3>Tipo</h3>
                    <p>Chata / Lisa</p>
                </Paper>
                <Paper sx={styles.paper}>
                    <h3>Peso</h3>
                    <p>1 Kg</p>
                </Paper>
            </div>

            <div className="cart-container">
                <MinusIcon />
                <TextField value={quantity} onChange={(event) => setQuantity(Number(event.target.value))} />
                <PlusIcon />
                <Button>Adicionar ao carrinho</Button>
            </div>
        </div>
    )
}
