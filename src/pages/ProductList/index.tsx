import React, { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Product } from "../../definitions/product"
import { Box, Skeleton } from "@mui/material"
import styles from "./styles"
import { useApi } from "../../hooks/useApi"
import { ProductContainer } from "./ProductContainer"
import { Button } from "../../components/Button"
import { useArray } from "burgos-array"

interface ProdutListProps {}

export const ProdutList: React.FC<ProdutListProps> = ({}) => {
    const currentProduct: Product = useLocation().state.currentProduct
    const api = useApi()
    const navigate = useNavigate()
    const skeletons = useArray().newArray(10)

    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        api.products.name({
            data: { name: currentProduct.name.split(" ")[0] },
            callback: (response: { data: Product[] }) => {
                setProducts(response.data)
            },
            finallyCallback: () => setLoading(false),
        })
    }, [])

    return (
        <Box sx={styles.body}>
            <Box sx={styles.title}>
                <p style={{ fontSize: "5vw" }}>
                    Produtos similares a "<span style={{ fontWeight: "bold" }}>{currentProduct.name.split(" ")[0]}</span>"
                </p>
            </Box>

            <Box sx={styles.list}>
                {loading
                    ? skeletons.map((index) => (
                          <Skeleton
                              key={index}
                              variant="rectangular"
                              sx={{ width: "100%", height: "50vh" }}
                              animation="wave"
                          />
                      ))
                    : products.map((product) => <ProductContainer key={product.id} product={product} />)}
            </Box>

            <Box sx={styles.buttons}>
                <Button sx={{ flex: 0.45 }} onClick={() => navigate("/scan", { state: { product: currentProduct } })}>
                    Voltar
                </Button>
                <Button sx={{ flex: 0.45 }} onClick={() => navigate("/cart")}>
                    Carrinho
                </Button>
            </Box>
        </Box>
    )
}
