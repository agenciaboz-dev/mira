import {
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    LinearProgress,
    TextField,
} from "@mui/material"
import { useConfirmDialog } from "burgos-confirm"
import { useNumberMask } from "burgos-masks"
import { Form, Formik } from "formik"
import React, { useState } from "react"
import MaskedInput from "react-text-mask"
import { useApi } from "../../../hooks/useApi"
import { useProducts } from "../../../hooks/useProducts"
import { useSnackbar } from "burgos-snackbar"
import { AxiosError } from "axios"

interface ProfitMarginProps {}

interface FormValues {
    margin: string
}

export const ProfitMargin: React.FC<ProfitMarginProps> = ({}) => {
    const percentageMask = useNumberMask({ allowDecimal: false, suffix: " %" })
    const api = useApi()

    const { confirm } = useConfirmDialog()
    const { products, setProducts } = useProducts()
    const { snackbar } = useSnackbar()

    const [loading, setLoading] = useState(false)
    const [currentProduct, setCurrentProduct] = useState<Product>(products[0])

    const initialValues = {
        margin: "",
    }

    const updateProduct = (product: Product, factor: number) => {
        setCurrentProduct(product)

        api.products.profitMargin({
            data: { product, price: Number(product.cost) * factor },
            callback: () => {
                if (products.indexOf(product) == products.length - 1) {
                    setLoading(false)
                    snackbar({ severity: "success", text: "Preços atualizados com sucesso" })
                } else {
                    updateProduct(products[products.indexOf(product) + 1], factor)
                }
            },
            errorCallback: (error: AxiosError) => {
                snackbar({ severity: "error", text: error.message })
            },
        })
    }

    const applyMargin = (factor: number) => {
        updateProduct(products[0], factor)
    }

    const handleSubmit = (values: FormValues) => {
        if (loading) return
        if (!values.margin) {
            snackbar({ severity: "warning", text: "Nenhum valor informado" })
            return
        }

        const factor = Number(values.margin.replace(/\D/g, "")) / 100 + 1

        confirm({
            title: "Atenção",
            content: `Esta ação irá alterar o preço de venda de todos os produtos e a página não pode ser fechada durante o processo. Deseja prosseguir?`,
            onConfirm: () => {
                setLoading(true)
                api.products.get({
                    callback: (response: { data: Product[] }) => {
                        setProducts(response.data)
                        setTimeout(() => applyMargin(factor), 1000)
                    },
                })
            },
        })
    }

    return (
        <>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                {({ handleChange, values }) => (
                    <Form style={{ gap: "1vw" }}>
                        <MaskedInput
                            mask={percentageMask}
                            guide={false}
                            name="margin"
                            value={values.margin}
                            onChange={handleChange}
                            render={(ref, props) => <TextField inputRef={ref} {...props} label="Aplicar margem de lucro" />}
                        />

                        <Button variant="contained" type="submit">
                            {loading ? <CircularProgress size={"1.5rem"} sx={{ color: "white" }} /> : "Aplicar"}
                        </Button>
                    </Form>
                )}
            </Formik>
            <Dialog
                open={loading}
                onClose={() => {}}
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <DialogTitle>Atualizando produtos. Não saia desta página</DialogTitle>
                <DialogContent sx={{ flexDirection: "column", width: "100%", gap: "1vw" }}>
                    <DialogContentText>
                        {products.indexOf(currentProduct) + 1}/{products.length} -{" "}
                        {((products.indexOf(currentProduct) / products.length) * 100).toFixed(2)} %
                    </DialogContentText>
                    <LinearProgress
                        variant="determinate"
                        value={(products.indexOf(currentProduct) / products.length) * 100}
                    />
                </DialogContent>
            </Dialog>
        </>
    )
}
