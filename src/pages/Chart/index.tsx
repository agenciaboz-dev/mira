import { Avatar, IconButton } from "@mui/material"
import React from "react"
import "./style.scss"
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner"

interface ChartProps {}

export const Chart: React.FC<ChartProps> = ({}) => {
    return (
        <div className="Chart-Page">
            <div className="title-container">
                <IconButton>
                    <Avatar />
                </IconButton>
                <h2>Carrinho</h2>
                <IconButton>
                    <QrCodeScannerIcon sx={{ color: "white", height: "10vw", width: "10vw" }} />
                </IconButton>
            </div>
        </div>
    )
}
