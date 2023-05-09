import { Avatar, Badge, IconButton } from "@mui/material"
import React, { useEffect, useState } from "react"
import MaskedInput from "react-text-mask"
import { CurrencyText } from "../../components/CurrencyText"
import { useCart } from "../../hooks/useCart"
import { useNumberMask } from "../../hooks/useNumberMask"
import { ReactComponent as TrashIcon } from "../../images/trash.svg"
import { ReactComponent as QuestionIcon } from "../../images/question.svg"
import { useColors } from "../../hooks/useColors"
import { Cart } from "../../definitions/cart"
import { ProductStory } from "../../components/ProductStory"

interface ProductProps {
    product: Cart
}

export const Product: React.FC<ProductProps> = ({ product }) => {
    const [quantity, setQuantity] = useState(product.quantity)
    const [lastQuantity, setLastQuantity] = useState(product.quantity)
    const [story, setStory] = useState(false)

    const { cart, setCart } = useCart()
    const numberMask = useNumberMask()
    const colors = useColors()

    const removeProduct = () => {
        setCart(cart.filter((item) => item.id != product.id))
    }

    const onQuantityChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setQuantity(Number(event.target.value))
    }

    const onQuantityBlur: React.FocusEventHandler<HTMLInputElement> = (event) => {
        if (quantity) {
            setLastQuantity(quantity)
            const products = cart.filter((item) => item.id != product.id)
            setCart([...products, { ...product, quantity: quantity }])
        } else {
            setQuantity(lastQuantity)
        }
    }

    useEffect(() => {}, [quantity])

    return (
        <div className="Product-Component">
            <Badge
                badgeContent={
                    <IconButton onClick={() => setStory(true)}>
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
                    Preço: <CurrencyText value={product.price * quantity} />
                </p>
            </div>
            <IconButton onClick={removeProduct} sx={{ marginLeft: "auto" }}>
                <TrashIcon />
            </IconButton>
            <ProductStory product={product} open={story} setOpen={setStory} />
        </div>
    )
}