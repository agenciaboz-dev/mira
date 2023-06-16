import React from "react"
import "./specs1_style.scss"

interface Specs1Props {
    title: string
    value: string
}

export const Specs1: React.FC<Specs1Props> = ({ title, value }) => {
    return (
        <div className="Specs1-Component">
            <p style={{ fontWeight: "bold", fontSize: "1.4vw" }}>{title}</p>
            <p style={{ fontSize: "1.5vw" }}>{value}</p>
        </div>
    )
}
