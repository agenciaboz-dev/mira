import React, { useState } from "react"
import { Menu } from "../../components/Menu"
import { IconButton, Avatar } from "@mui/material"
import { useUser } from "../../hooks/useUser"
import { useCart } from "../../hooks/useCart"
import { useNavigate } from "react-router-dom"
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner"

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const openMenu = Boolean(anchorEl)

    const { user } = useUser()
    const { cart } = useCart()

    const navigate = useNavigate()

    const icon_style = { color: "white", height: "10vw", width: "10vw" }

    const handleCloseMenu = () => {
        setAnchorEl(null)
    }

    return (
        <div className="Header-Component">
            <IconButton onClick={(event) => setAnchorEl(event.currentTarget)}>
                <Avatar sx={icon_style} />
            </IconButton>

            <div className="info-container">
                <h3>{user?.name}</h3>
                <p>{!!cart.length && (cart.length > 1 ? "itens no carrinho" : "item no carrinho")}</p>
            </div>

            <IconButton onClick={() => navigate("/scan")}>
                <QrCodeScannerIcon sx={icon_style} />
            </IconButton>
            <Menu open={openMenu} anchorEl={anchorEl} handleClose={handleCloseMenu} />
        </div>
    )
}
