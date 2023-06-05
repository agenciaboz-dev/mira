import React, { useState } from "react"
import { Menu } from "../../components/Menu"
import { IconButton, } from "@mui/material"
import { useUser } from "../../hooks/useUser"
import { useCart } from "../../hooks/useCart"
import { useNavigate } from "react-router-dom"
// import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner"
import { ReactComponent as QrCodePlusIcon } from "../../images/qrcode_plus.svg"
import { ReactComponent as AvatarIcon } from "../../images/avatar_icon.svg"
import { ReactComponent as LittleArrowDown } from "../../images/little_arrow_down.svg"

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = ({}) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const openMenu = Boolean(anchorEl)

    const { user } = useUser()
    const { cart } = useCart()

    const navigate = useNavigate()

    const icon_style = { color: "white", height: "6vw", width: "6vw" }

    const handleCloseMenu = () => {
        setAnchorEl(null)
    }

    return (
        <div className="Header-Component">
            <IconButton onClick={(event) => setAnchorEl(event.currentTarget)}>
                <AvatarIcon />
                <LittleArrowDown style={{ width: "4vw", marginLeft: "-3vw", marginBottom: "0", alignSelf: "flex-end" }} />
            </IconButton>

            <div className="info-container">
                <h3>{user?.name}</h3>
                <p>{!!cart.length && (cart.length > 1 ? `${cart.length} itens no carrinho` : "1 item no carrinho")}</p>
            </div>

            <IconButton onClick={() => navigate("/scan")}>
                <QrCodePlusIcon style={icon_style} />
            </IconButton>
            <Menu open={openMenu} anchorEl={anchorEl} handleClose={handleCloseMenu} />
        </div>
    )
}
