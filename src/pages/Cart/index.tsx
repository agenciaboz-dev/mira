import "./style.scss"
import { Button, IconButton } from "@mui/material"
import { ReactComponent as AvatarIcon } from "../../images/avatar_icon.svg"
import { ReactComponent as LittleArrowDown } from "../../images/little_arrow_down.svg"
import React, { useEffect, useState } from "react"
// import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner"
import { ReactComponent as QrCodePlusIcon } from "../../images/qrcode_plus.svg"
import { useNavigate } from "react-router-dom"
import { useProducts } from "../../hooks/useProducts"
import { Product } from "./Product"
import { useCart } from "../../hooks/useCart"
import { useUser } from "../../hooks/useUser"
import { useLocalStorage } from "../../hooks/useLocalStorage"
import { TutorialMask } from "../../components/TutorialMask"
import { FinishContainer } from "./FinishContainer"
import { Menu } from "../../components/Menu"
import useMeasure from "react-use-measure"

interface CartProps {}

export const Cart: React.FC<CartProps> = ({}) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const openMenu = Boolean(anchorEl)

    const navigate = useNavigate()
    const { cart } = useCart()
    const [qrCodeRef, qrCodePositions] = useMeasure()

    const storage = useLocalStorage()
    const [tutorial, setTutorial] = useState(false)

    const icon_style = { color: "white", height: "6vw", width: "6vw" }

    const handleCloseMenu = () => {
        setAnchorEl(null)
    }

    useEffect(() => {
        const has_accessed = storage.get("has_accessed")
        if (has_accessed) {
            console.log("usuario acessou anteriormente, tutorial ja exibido")
        } else {
            console.log("primeiro acesso, exibir tutorial")
            setTutorial(true)
        }
    }, [])

    return (
        <div className="Cart-Page">
            <div className="title-container">
                <IconButton onClick={(event) => setAnchorEl(event.currentTarget)}>
                    <AvatarIcon />
                    <LittleArrowDown
                        style={{ width: "4vw", marginLeft: "-3vw", marginBottom: "0", alignSelf: "flex-end" }}
                    />
                </IconButton>
                <h2>Carrinho</h2>
                <IconButton onClick={() => navigate("/scan")}>
                    <QrCodePlusIcon ref={qrCodeRef} style={icon_style} />
                </IconButton>
            </div>

            {tutorial && <TutorialMask iconPositions={qrCodePositions} />}

            <div className="product-list">
                {cart.map((product) => (
                    <Product key={product.id} product={product} />
                ))}
            </div>

            <FinishContainer />
            <Menu open={openMenu} anchorEl={anchorEl} handleClose={handleCloseMenu} />
        </div>
    )
}
