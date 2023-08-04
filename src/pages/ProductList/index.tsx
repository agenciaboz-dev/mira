import React, { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Product } from "../../definitions/product"
import { Box, Skeleton, CircularProgress } from "@mui/material"
import styles from "./styles"
import { useApi } from "../../hooks/useApi"
import { ProductContainer } from "./ProductContainer"
import { Button } from "../../components/Button"
import { useArray } from "burgos-array"
import { TextField } from "../../components/TextField"
import SearchIcon from "@mui/icons-material/Search"
import { Form, Formik } from "formik"

interface ProdutListProps {}

interface FormValues {
    name: string
}

export const ProdutList: React.FC<ProdutListProps> = ({}) => {
    const currentProduct: Product | undefined = useLocation().state?.currentProduct || undefined
    const api = useApi()
    const navigate = useNavigate()
    const skeletons = useArray().newArray(10)

    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)

    const initialValues = {
        name: currentProduct?.name.split(" ")[0] || "",
    }

    const handleSubmit = (values: FormValues) => {
        if (loading) return
        setLoading(true)

        api.products.name({
            data: values,
            callback: (response: { data: Product[] }) => {
                setProducts(response.data)
            },
            finallyCallback: () => setLoading(false),
        })
    }

    useEffect(() => {
        if (currentProduct) {
            api.products.name({
                data: { name: currentProduct.name.split(" ")[0] },
                callback: (response: { data: Product[] }) => {
                    setProducts(response.data)
                },
                finallyCallback: () => setLoading(false),
            })
        } else {
            setLoading(false)
        }
    }, [])

    return (
        <Box sx={styles.body}>
            <Box sx={styles.title}>
                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                    {({ values, handleChange }) => (
                        <Form>
                            <TextField
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                                sx={{ border: "none!important", outline: "none" }}
                                InputProps={{
                                    startAdornment: loading ? <CircularProgress size={"1.5rem"} /> : <SearchIcon />,
                                    sx: { border: "none" },
                                }}
                                inputProps={{ style: { border: "none" } }}
                                placeholder="Buscar"
                            />
                        </Form>
                    )}
                </Formik>
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

            <Button fullWidth onClick={() => navigate("/cart")} sx={{ marginTop: "auto" }}>
                Voltar
            </Button>
        </Box>
    )
}
