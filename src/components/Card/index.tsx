import React from "react"
import "./style.scss"
import { Card as CardType } from "../../definitions/user"
import VisibilityIcon from "@mui/icons-material/Visibility"

interface CardProps {
    card: CardType
}

export const Card: React.FC<CardProps> = ({ card }) => {
    return (
        <div className="Card-Component">
            <div className="cardnumber-container">
                <h3>{card.number || "0000 0000 0000 0000"}</h3>
                <VisibilityIcon />
            </div>
            <p>Número do cartão</p>

            <div className="name-expiration">
                <h3>{card.name || "Nome"}</h3>
                <h3>{card.expiration || "00/00"}</h3>
            </div>

            <div className="cvv-container">
                <p>Nome no cartão</p>
                <h4>{card.cvv || "000"}</h4>
            </div>
        </div>
    )
}
