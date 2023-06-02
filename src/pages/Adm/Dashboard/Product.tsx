import React, { useState } from "react"
import { Product as ProductType } from "../../../definitions/product"
import EditIcon from "@mui/icons-material/Edit"
import { Box, IconButton, Paper } from "@mui/material"
import { CurrencyText } from "../../../components/CurrencyText"
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner"
import CurrencyFormat from "react-currency-format"
import { QrCodeModal } from "../../../components/QrcodeModal"
import DeleteIcon from "@mui/icons-material/Delete"
import { useApi } from "../../../hooks/useApi"
import { useProducts } from "../../../hooks/useProducts"
import { useSnackbar } from "../../../hooks/useSnackbar"
import { useCurrentProduct } from "../../../hooks/useCurrentProduct"
import styles from "./styles"

interface ProductProps {
    product: ProductType
}

export const Product: React.FC<ProductProps> = ({ product }) => {
    const vw = window.innerWidth / 100
    const [showCode, setShowCode] = useState(false)

    const api = useApi()
    const products = useProducts()
    const { snackbar } = useSnackbar()
    const { setCurrentProduct, setOpen } = useCurrentProduct()

    const editProduct = () => {
        setOpen(true)
        setCurrentProduct(product)
    }

    const handleDeleteClick = () => {
        api.products.delete({
            data: product,
            callback: (response: { data: ProductType }) => {
                products.refresh()
                snackbar({
                    severity: "warning",
                    text: "Produto deletado",
                })
            },
        })
    }

    return (
        <Paper sx={styles.body}>
            <Box sx={styles.info}>
                <h3 style={{ flex: "0.4" }}>{product.name}</h3>
                <CurrencyText style={{ flex: "0.4" }} value={product.price} />
                <CurrencyFormat
                    value={product.stock}
                    displayType="text"
                    thousandSeparator="."
                    decimalSeparator=","
                    decimalScale={2}
                    fixedDecimalScale={false}
                    prefix={""}
                    style={{ flex: "0.4" }}
                />
            </Box>
            <Box sx={styles.actions}>
                <IconButton onClick={() => setShowCode(true)}>
                    <QrCodeScannerIcon color="primary" />
                </IconButton>
                <IconButton onClick={() => editProduct()}>
                    <EditIcon color="primary" />
                </IconButton>
                <IconButton onClick={handleDeleteClick}>
                    <DeleteIcon color="error" />
                </IconButton>
            </Box>
            <QrCodeModal open={showCode} setOpen={setShowCode} />
        </Paper>
    )
}
