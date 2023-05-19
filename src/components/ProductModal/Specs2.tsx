import React from "react"

interface Specs2Props {
    title: string
    value: string
    colors: string[]
}

export const Specs2: React.FC<Specs2Props> = ({ title, value, colors }) => {
    const container_style: React.CSSProperties = {
        borderRadius: "1vw",
    }

    const p_style: React.CSSProperties = {
        flex: 1,
        fontWeight: "bold",
        backgroundColor: colors[0],
        padding: "1vw",
        color: "#555555",
    }

    return (
        <div className="Specs2-Component" style={container_style}>
            <p style={p_style}>{title}</p>
            <p style={{ ...p_style, textAlign: "center", fontWeight: "normal", backgroundColor: colors[1] }}>{value}</p>
        </div>
    )
}
