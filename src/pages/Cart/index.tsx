import "./style.scss"
import { Box, Button, IconButton, MenuItem, Avatar, TextField, CircularProgress } from "@mui/material"
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
import CategoryIcon from "@mui/icons-material/Category"
import { Button as DesignedButton } from "../../components/Button"
import { useReset } from "../../hooks/useReset"
import { useArray } from "burgos-array"
import SearchIcon from "@mui/icons-material/Search"
import { Form, Formik } from "formik"
import { useApi } from "../../hooks/useApi"

interface CartProps {}

interface SearchFormValues {
    name: string
}

export const Cart: React.FC<CartProps> = ({}) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const openMenu = Boolean(anchorEl)

    const navigate = useNavigate()
    const reset = useReset()
    const skeletons = useArray().newArray(15)
    const api = useApi()
    const { cart } = useCart()
    const { products } = useProducts()
    const { categories } = useCategories()

    const [openProduct, setOpenProduct] = useState(false)
    const [product, setProduct] = useState<ProductType>()
    const [productList, setProductList] = useState(products)
    const [title, setTitle] = useState("Todos")
    const [loading, setLoading] = useState(false)

    const icon_style = { color: "white", height: "auto", width: "5vw" }

    const searchValues: SearchFormValues = {
        name: "",
    }

    const handleSearchSubmit = (values: SearchFormValues) => {
        if (loading) return
        setLoading(true)

        api.products.name({
            data: values,
            callback: (response: { data: ProductType[] }) => setProductList(response.data),
            finallyCallback: () => setLoading(false),
        })
    }

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
                <DesignedButton className="cancel-purchase-button" onClick={reset}>
                    Cancelar compra
                </DesignedButton>
                <img src="/promotions.png" alt="Promoções" />
            </div>

            <div className="catalog-container">
                <Box
                    className="categories-list"
                    sx={{
                        flexDirection: "column",
                        width: "20vw",
                        alignItems: "center",
                        gap: "3vw",
                        padding: "5vw 0",
                    }}
                >
                    <MenuItem
                        sx={{ width: "100%", justifyContent: "center" }}
                        onClick={() => onCategoryClick({ id: 0, image: "", name: "Todos" })}
                    >
                        Todos
                    </MenuItem>
                    {categories.map((category) => (
                        <MenuItem
                            key={category.id}
                            onClick={() => onCategoryClick(category)}
                            sx={{
                                width: "100%",
                                alignItems: "center",
                                textAlign: "center",
                                whiteSpace: "break-spaces",
                                flexDirection: "column",
                                gap: "1vw",
                            }}
                        >
                            <Avatar src={category.image} variant="rounded" sx={{ width: "10vw", height: "10vw" }}>
                                <CategoryIcon />
                            </Avatar>
                            {category.name}
                        </MenuItem>
                    ))}
                </Box>
                <div className="product-list-container">
                    <Formik initialValues={searchValues} onSubmit={handleSearchSubmit}>
                        {({ values, handleChange }) => (
                            <Form>
                                <TextField
                                    variant="standard"
                                    name="name"
                                    value={values.name}
                                    onChange={handleChange}
                                    placeholder="Digite o que está procurando"
                                    color="secondary"
                                    autoComplete="off"
                                    InputProps={{
                                        sx: { gap: "1vw" },
                                        startAdornment: loading ? (
                                            <CircularProgress size="1.3rem" color="secondary" />
                                        ) : (
                                            <SearchIcon color="secondary" />
                                        ),
                                    }}
                                />
                            </Form>
                        )}
                    </Formik>
                    <h1>{title}</h1>
                    <div className="product-list">
                        {productList.map((product) => (
                            <MenuItem className="product-container" key={product.id} onClick={() => onProductClick(product)}>
                                <img src={product.image} alt={product.name} />
                                <p
                                    style={{
                                        whiteSpace: "nowrap",
                                        textOverflow: "ellipsis",
                                        overflow: "hidden",
                                        width: "20vw",
                                    }}
                                >
                                    {product.name}
                                </p>
                            </MenuItem>
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
