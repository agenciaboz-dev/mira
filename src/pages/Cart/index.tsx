import "./style.scss"
import { Button, IconButton } from "@mui/material"
import { ReactComponent as AvatarIcon } from "../../images/avatar_icon.svg"
import React, { useEffect, useState } from "react"
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner"
import { useNavigate } from "react-router-dom"
import { useProducts } from "../../hooks/useProducts"
import { Product } from "./Product"
import { useCart } from "../../hooks/useCart"
import { useUser } from "../../hooks/useUser"
import { useLocalStorage } from "../../hooks/useLocalStorage"
import { TutorialMask } from "../../components/TutorialMask"
import { FinishContainer } from "./FinishContainer"
import { Menu } from "../../components/Menu"
import { ProductModal } from "../../components/ProductModal"
import { Product as ProductType } from "../../definitions/product"

interface CartProps {}

export const Cart: React.FC<CartProps> = ({}) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const openMenu = Boolean(anchorEl)

    const navigate = useNavigate()
    const { cart } = useCart()
    const { products } = useProducts()

    const [openProduct, setOpenProduct] = useState(false)
    const [product, setProduct] = useState<ProductType>()

    const icon_style = { color: "white", height: "auto", width: "5vw" }

    const handleCloseMenu = () => {
        setAnchorEl(null)
    }

    const onProductClick = (product: ProductType) => {
        setProduct(product)
        setOpenProduct(true)
    }

    return (
        <div className="Cart-Page">
            <div className="title-container">
                <img src="/promotions.png" alt="Promoções" />
            </div>

            <div className="catalog-container">
                <div className="categories-list"></div>
                <div className="product-list-container">
                    <h1>[Categoria Escolhida]</h1>
                    <div className="product-list">
                        {products.map((product) => (
                            <IconButton
                                className="product-container"
                                key={product.id}
                                onClick={() => onProductClick(product)}
                            >
                                <img src={product.image} alt={product.name} />
                                <p>{product.name}</p>
                            </IconButton>
                        ))}
                    </div>
                </div>
            </div>

            <div className="cart-list">
                {cart.map((product) => (
                    <Product key={product.id} product={product} />
                ))}
            </div>

            <FinishContainer />
            <Menu open={openMenu} anchorEl={anchorEl} handleClose={handleCloseMenu} />
            {product && <ProductModal open={openProduct} setOpen={setOpenProduct} product={product} />}
        </div>
    )
}
