import React, { useState } from "react"
import "./style.scss"
import { Card as CardType } from "../../definitions/user"
import VisibilityIcon from "@mui/icons-material/Visibility"
import { IconButton } from "@mui/material"

interface CardProps {
    card: CardType
}

export const Card: React.FC<CardProps> = ({ card }) => {
    const [cardNumberView, setCardNumberView] = useState(false)

    return (
        <div className="Card-Component">
            <div className="cardtop-container">
                <p>Número do cartão</p>
                <IconButton onClick={() => setCardNumberView(!cardNumberView)} sx={{ color: "white" }}>
                    <VisibilityIcon />
                </IconButton>
            </div>
            <h4>{cardNumberView ? card.number || "0000 0000 0000 0000" : `**** **** **** ${card.number?.split(" ").pop() || "****"}`}</h4>

            <div className="name-expiration">
                <h3>{card.name || "Nome"}</h3>
                <h4>{card.expiration_month ? `${card.expiration_month}/${card.expiration_year}` : ""}</h4>
            </div>
        </div>
    )
}
