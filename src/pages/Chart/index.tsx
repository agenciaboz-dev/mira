import { Avatar, IconButton } from "@mui/material"
import React from "react"
import "./style.scss"
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner"
import { useNavigate } from "react-router-dom"

interface ChartProps {}

export const Chart: React.FC<ChartProps> = ({}) => {
    const navigate = useNavigate()

    return (
        <div className="Chart-Page">
            <div className="title-container">
                <IconButton>
                    <Avatar />
                </IconButton>
                <h2>Carrinho</h2>
                <IconButton onClick={() => navigate("/scan")}>
                    <QrCodeScannerIcon sx={{ color: "white", height: "10vw", width: "10vw" }} />
                </IconButton>
            </div>
        </div>
    )
}
