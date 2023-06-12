import "./style.scss"
import { Box, Button, IconButton } from "@mui/material"
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
import { useCategories } from "../../hooks/useCategories"

interface CartProps {}

export const Cart: React.FC<CartProps> = ({}) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const openMenu = Boolean(anchorEl)

    const navigate = useNavigate()
    const { cart } = useCart()
    const { products } = useProducts()
    const { categories } = useCategories()

    const [openProduct, setOpenProduct] = useState(false)
    const [product, setProduct] = useState<ProductType>()
    const [productList, setProductList] = useState(products)
    const [title, setTitle] = useState("Todos")

    const icon_style = { color: "white", height: "auto", width: "5vw" }

    const handleCloseMenu = () => {
        setAnchorEl(null)
    }

    const onProductClick = (product: ProductType) => {
        setProduct(product)
        setOpenProduct(true)
    }

    const onCategoryClick = (category: Category) => {
        if (!category.id) {
            setProductList(products)
        } else {
            const newList = products.filter((product) => product.categories.filter((item) => item.id == category.id)[0])
            setProductList(newList)
        }

        setTitle(category.name)
    }

    useEffect(() => {
        setProductList(products)
    }, [products])

    return (
        <div className="Cart-Page">
            <div className="title-container">
                <img src="/promotions.png" alt="Promoções" />
            </div>

            <div className="catalog-container">
                <Box
                    className="categories-list"
                    sx={{ flexDirection: "column", width: "100%", alignItems: "center", gap: "5vw", padding: "5vw 0" }}
                >
                    <p onClick={() => onCategoryClick({ id: 0, name: "Todos" })}>Todos</p>
                    {categories.map((category) => (
                        <p key={category.id} onClick={() => onCategoryClick(category)}>
                            {category.name}
                        </p>
                    ))}
                </Box>
                <div className="product-list-container">
                    <h1>{title}</h1>
                    <div className="product-list">
                        {productList.map((product) => (
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
