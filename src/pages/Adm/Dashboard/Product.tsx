import React from "react"
import { Product as ProductType } from "../../../definitions/product"
import EditIcon from "@mui/icons-material/Edit"
import { IconButton, Paper } from "@mui/material"
import { CurrencyText } from "../../../components/CurrencyText"
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner"
import CurrencyFormat from "react-currency-format"

interface ProductProps {
    product: ProductType
    setProduct: (product: ProductType) => void
}

export const Product: React.FC<ProductProps> = ({ product, setProduct }) => {
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
                <IconButton onClick={() => setProduct(product)}>
                    <QrCodeScannerIcon color="primary" />
                </IconButton>
                <IconButton onClick={() => setProduct(product)}>
                    <EditIcon color="primary" />
                </IconButton>
            </div>
        </Paper>
    )
}
