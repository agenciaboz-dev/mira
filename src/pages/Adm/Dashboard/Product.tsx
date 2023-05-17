import React, { useState } from "react"
import { Product as ProductType } from "../../../definitions/product"
import EditIcon from "@mui/icons-material/Edit"
import { IconButton, Paper } from "@mui/material"
import { CurrencyText } from "../../../components/CurrencyText"
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner"
import CurrencyFormat from "react-currency-format"
import { QrCodeModal } from "../../../components/QrcodeModal"
import DeleteIcon from "@mui/icons-material/Delete"
import { useApi } from "../../../hooks/useApi"
import { useProducts } from "../../../hooks/useProducts"
import { useSnackbar } from "../../../hooks/useSnackbar"

interface ProductProps {
    product: ProductType
    setProduct: (product: ProductType) => void
}

export const Product: React.FC<ProductProps> = ({ product, setProduct }) => {
    const [showCode, setShowCode] = useState(false)

    const api = useApi()
    const products = useProducts()
    const { snackbar } = useSnackbar()

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
        <Paper className="Product-Component">
            <div className="info-container">
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
            </div>
            <div className="actions-container">
                <IconButton onClick={() => setShowCode(true)}>
                    <QrCodeScannerIcon color="primary" />
                </IconButton>
                <IconButton onClick={() => setProduct(product)}>
                    <EditIcon color="primary" />
                </IconButton>
                <IconButton onClick={handleDeleteClick}>
                    <DeleteIcon color="error" />
                </IconButton>
            </div>
            <QrCodeModal id={product.id} open={showCode} setOpen={setShowCode} />
        </Paper>
    )
}
