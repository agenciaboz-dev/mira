import "./style.scss"
import { Button, IconButton, MenuItem } from "@mui/material"
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
import SearchIcon from "@mui/icons-material/Search"

interface CartProps {}

export const Cart: React.FC<CartProps> = ({}) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const openMenu = Boolean(anchorEl)

    const navigate = useNavigate()
    const { cart } = useCart()
    const [qrCodeRef, qrCodePositions] = useMeasure()

    const storage = useLocalStorage()
    const [tutorial, setTutorial] = useState(false)

    const icon_style = { color: "white", height: "8vw", width: "8vw" }
    const button_style = { padding: "0" }

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

    useEffect(() => {
        if (location.pathname == "/cart") {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            })
        }
    }, [location.pathname])

    return (
        <div className="Cart-Page">
            <div className="title-container">
                <IconButton onClick={(event) => setAnchorEl(event.currentTarget)} style={button_style}>
                    <AvatarIcon style={{ width: "8vw" }} />
                    <LittleArrowDown style={{ width: "3vw", marginLeft: "-3vw", marginBottom: "2vw", alignSelf: "flex-end" }} />
                </IconButton>
                <h2 style={{ pointerEvents: "none" }}>Carrinho</h2>
                <IconButton onClick={() => navigate("/scan")} style={button_style}>
                    <QrCodePlusIcon ref={qrCodeRef} style={icon_style} />
                </IconButton>
            </div>

            {tutorial && <TutorialMask iconPositions={qrCodePositions} />}

            <div className="product-list">
                {cart.map((product) => (
                    <Product key={product.id} product={product} />
                ))}
            </div>

            <Button
                variant="contained"
                color="secondary"
                sx={{
                    position: "fixed",
                    bottom: "50vw",
                    right: "8vw",
                    zIndex: 5,
                    minWidth: 0,
                    width: "18vw",
                    height: "18vw",
                    borderRadius: "5vw",
                    backgroundColor: "white",
                    color: "#555",
                    border: "1px solid #555",
                    boxShadow: "2px 8px 0px #1a7fb7",
                }}
                onClick={() => navigate("/products")}
            >
                <SearchIcon sx={{ width: "8.5vw", height: "auto" }} />
            </Button>

            <FinishContainer />
            <Menu open={openMenu} anchorEl={anchorEl} handleClose={handleCloseMenu} />
        </div>
    )
}
