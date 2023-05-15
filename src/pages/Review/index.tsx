import React from "react"
import "./style.scss"
import { Button } from "../../components/Button"
import { useColors } from "../../hooks/useColors"
import { useNavigate } from "react-router-dom"

interface ReviewProps {}

export const Review: React.FC<ReviewProps> = ({}) => {
    const navigate = useNavigate()
    const colors = useColors()

    return (
        <div className="Review-Page">
            <div className="cancel-container">
                <h4>Finalização de compra</h4>
                <Button
                    onClick={() => navigate("/cart")}
                    style={{ color: colors.purple, boxShadow: "none", background: "white" }}
                >
                    Cancelar
                </Button>
            </div>
        </div>
    )
}
