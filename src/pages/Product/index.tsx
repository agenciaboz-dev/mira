import React, { useEffect, useState } from "react"
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
import { Button } from "../../components/Button"
import TextField from "@mui/material/TextField"
import { useCart } from "../../hooks/useCart"
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered"

interface ProductProps {
    product: ProductType
    style?: React.CSSProperties
    innerRef?: any
    onClose?: () => void
}

export const Product: React.FC<ProductProps> = ({ product, style, innerRef, onClose }) => {
    const params = useParams()
    const buying = params.buying

    const { products } = useProducts()
    const { add } = useCart()
    const colors = useColors()
    const navigate = useNavigate()

    const [quantity, setQuantity] = useState(1)

    const changeQuantity = (value: number) => {
        if (quantity == 1 && value == -1) return

        setQuantity(quantity + value)
    }

    const addToCart = () => {
        add(product, quantity)
        navigate("/cart")
    }

    const handleClose = () => {
        if (onClose) {
            onClose()
        } else {
            navigate(-1)
        }
    }

    return (
        <div className="Product-Page" style={style} ref={innerRef}>
            <div className="main-container">
                <img className="image" src={product.image} alt={product.name} />

                <IconButton
                    sx={{ marginRight: "auto", position: "absolute", top: "2vw", left: "2vw" }}
                    onClick={() => navigate("/products", { state: { currentProduct: product } })}
                    color="primary"
                >
                    <FormatListNumberedIcon sx={{ ...styles.cancel_icon, color: "none" }} />
                </IconButton>

                <IconButton
                    sx={{ marginLeft: "auto", position: "absolute", top: "2vw", right: "2vw" }}
                    onClick={() => handleClose()}
                >
                    <CancelIcon sx={styles.cancel_icon} />
                </IconButton>

                <div className="title-container">
                    <CurrencyText value={product.price} />
                    <h1 style={{ fontSize: "4vw" }}>{product.name}</h1>
                </div>

                <div className="product-description-container">
                    <p style={{ fontSize: "2.8vw", textAlign: "justify" }}>{product.description}</p>
                </div>

                <div className="specs-container" style={{ gap: "2vw" }}>
                    <Paper sx={styles.paper}>
                        <h3 style={{ fontSize: "3vw" }}>Fabricante</h3>
                        <p style={{ fontSize: "2.5vw" }}>{product.brand}</p>
                    </Paper>
                    <Paper sx={styles.paper}>
                        <h3 style={{ fontSize: "3vw" }}>Dimensões</h3>
                        <p style={{ fontSize: "2.5vw" }}>
                            {product.width}cm x {product.height}cm x {product.length}cm
                        </p>
                    </Paper>
                    <Paper sx={styles.paper}>
                        <h3 style={{ fontSize: "3vw" }}>Peso</h3>
                        <p style={{ fontSize: "2.5vw" }}>{product.weight} Kg</p>
                    </Paper>
                </div>
            </div>
            <div className="cart-container">
                <IconButton onClick={() => changeQuantity(-1)}>
                    <MinusIcon style={styles.cart_icon} />
                </IconButton>
                <TextField
                    value={quantity}
                    onChange={(event) => setQuantity(Number(event.target.value))}
                    sx={{ width: "20%" }}
                    InputProps={{
                        sx: {
                            backgroundColor: colors.light_grey2,
                            borderRadius: "7vw",
                            height: "8vw",
                        },
                    }}
                    inputProps={{ sx: { textAlign: "center" }, inputMode: "numeric" }}
                />
                <IconButton onClick={() => changeQuantity(1)}>
                    <PlusIcon style={styles.cart_icon} />
                </IconButton>
                <Button style={{ height: "8vw", width: "45%", marginLeft: "8vw" }} onClick={() => addToCart()}>
                    Adicionar ao carrinho
                </Button>
            </div>
        </div>
    )
}
