import React, { useState } from "react"
import { Menu } from "../../components/Menu"
import { IconButton, } from "@mui/material"
import { useUser } from "../../hooks/useUser"
import { useCart } from "../../hooks/useCart"
import { useNavigate } from "react-router-dom"
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner"
import { ReactComponent as AvatarIcon } from "../../images/avatar_icon.svg"
import { ReactComponent as LittleArrowDown } from "../../images/little_arrow_down.svg"
import { ReactComponent as LittlePlusIcon } from "../../images/little_plus_icon.svg"

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const openMenu = Boolean(anchorEl)

    const { user } = useUser()
    const { cart } = useCart()

    const navigate = useNavigate()

    const icon_style = { color: "white", height: "auto", width: "5vw" }

    const handleCloseMenu = () => {
        setAnchorEl(null)
    }

    return (
        <div className="Header-Component">
            <IconButton onClick={(event) => setAnchorEl(event.currentTarget)}>
                <AvatarIcon style={{ marginLeft: "-1vw", width: "5vw" }} />
                <LittleArrowDown style={{ marginLeft: "-1vw", alignSelf: "flex-end" }} />
            </IconButton>

            <div className="info-container">
                <h3>{user?.name}</h3>
                <p>{!!cart.length && (cart.length > 1 ? `${cart.length} itens no carrinho` : "1 item no carrinho")}</p>
            </div>

            <IconButton onClick={() => navigate("/scan")}>
                <QrCodeScannerIcon sx={icon_style} />
                <LittlePlusIcon style={{ marginRight: "-1vw" }} />
            </IconButton>
            <Menu open={openMenu} anchorEl={anchorEl} handleClose={handleCloseMenu} />
        </div>
    )
}
