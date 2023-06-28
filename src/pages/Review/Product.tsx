import { Badge, IconButton } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useCart } from "../../hooks/useCart"
import { useNumberMask } from "../../hooks/useNumberMask"
import { ReactComponent as QuestionIcon } from "../../images/question.svg"
import { useColors } from "../../hooks/useColors"
import { Cart } from "../../definitions/cart"
import { ProductStory } from "../../components/ProductStory"

import Rating from '@mui/material/Rating';
import { Product as ProductType } from "../../definitions/product"

interface ProductProps {
    product: ProductType
}

export const Product: React.FC<ProductProps> = ({ product }) => {
    const [value, setValue] = React.useState<number | null>(2);
    const [story, setStory] = useState(false)

    // const { cart, setCart } = useCart()
    const colors = useColors()

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
                <img style={{ width: "15vw", height: "15vw" }} src={product.image} />
            </Badge>

            <div className="right-container">
                <p>
                    Produto: <span className="product-name">{product.name}</span>
                </p>
                <div className="rating-container">
                    <Rating
                        name="simple-controlled"
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                    />
                </div>
            </div>

            <ProductStory product={product} open={story} setOpen={setStory} />
        </div>
    )
}
