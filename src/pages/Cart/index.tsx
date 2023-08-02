import "./style.scss"
import { Button, IconButton, Tooltip } from "@mui/material"
import { ReactComponent as AvatarIcon } from "../../images/avatar_icon.svg"
import { ReactComponent as LittleArrowDown } from "../../images/little_arrow_down.svg"
import { ReactComponent as QrCodePlusIcon } from "../../images/qrcode_plus_icon.svg"
import React, { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
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
    const storage = useLocalStorage()
    const location = useLocation()
    const { cart } = useCart()

    const [qrCodeRef, qrCodePositions] = useMeasure()
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
            <div className="title-container" style={{ padding: "0 2vw 0 3vw" }}>
                <h2 style={{ fontSize: "4vw", marginLeft: "0.5vw" }}>Carrinho</h2>

                <div style={{ gap: "2vw", padding: "0" }}>
                    <Tooltip title="Buscar Produtos">
                        <IconButton onClick={() => navigate("/products")}>
                            <SearchIcon style={icon_style} />
                        </IconButton>
                    </Tooltip>
                    <IconButton onClick={() => navigate("/scan")}>
                        <QrCodePlusIcon ref={qrCodeRef} style={icon_style} />
                    </IconButton>
                    <IconButton onClick={(event) => setAnchorEl(event.currentTarget)} sx={{ padding: "1vw" }}>
                        <AvatarIcon style={{ width: "8vw" }} />
                        <LittleArrowDown
                            style={{ width: "4vw", marginLeft: "-3vw", marginBottom: "0", alignSelf: "flex-end" }}
                        />
                    </IconButton>
                </div>
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
