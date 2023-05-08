import { Avatar, Badge, IconButton } from "@mui/material"
import React, { useEffect, useState } from "react"
import MaskedInput from "react-text-mask"
import { CurrencyText } from "../../components/CurrencyText"
import { Product as ProductType } from "../../definitions/product"
import { useChart } from "../../hooks/useChart"
import { useNumberMask } from "../../hooks/useNumberMask"
import { ReactComponent as TrashIcon } from "../../images/trash.svg"
import { ReactComponent as QuestionIcon } from "../../images/question.svg"
import { useColors } from "../../hooks/useColors"

interface ProductProps {
    product: ProductType
}

export const Product: React.FC<ProductProps> = ({ product }) => {
    const [quantity, setQuantity] = useState("1")
    const [lastQuantity, setLastQuantity] = useState("1")

    const { chart, setChart } = useChart()
    const numberMask = useNumberMask()
    const colors = useColors()

    const removeProduct = () => {
        setChart(chart.filter((item) => item.id != product.id))
    }

    const onQuantityChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setQuantity(event.target.value)
    }

    const onQuantityBlur: React.FocusEventHandler<HTMLInputElement> = (event) => {
        if (quantity) {
            setLastQuantity(quantity)
        } else {
            setQuantity(lastQuantity)
        }
    }

    useEffect(() => {}, [quantity])

    return (
        <div className="Product-Component">
            <Badge
                badgeContent={
                    <IconButton>
                        <QuestionIcon style={{ width: "5.5vw", height: "auto" }} />
                    </IconButton>
                }
                color={"secondary"}
                sx={{ color: colors.blue }}
            >
                <Avatar sx={{ width: "15vw", height: "15vw" }} />
            </Badge>
            <div className="text-container">
                <p>
                    Produto: <span>{product.name}</span>
                </p>
                <p>
                    Quantidade:{" "}
                    <MaskedInput
                        mask={numberMask}
                        className="quantity-input"
                        inputMode="numeric"
                        value={quantity}
                        onChange={onQuantityChange}
                        onBlur={onQuantityBlur}
                    />
                </p>
                <p>
                    Preço: <CurrencyText value={product.price} />
                </p>
            </div>
            <IconButton onClick={removeProduct} sx={{ marginLeft: "auto" }}>
                <TrashIcon />
            </IconButton>
        </div>
    )
}
