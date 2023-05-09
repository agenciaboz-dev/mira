import { Avatar, Button, IconButton, Menu, MenuItem } from "@mui/material"
import React, { useEffect, useState } from "react"
import "./style.scss"
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner"
import { useNavigate } from "react-router-dom"
import { useProducts } from "../../hooks/useProducts"
import { Product } from "./Product"
import { useCart } from "../../hooks/useCart"
import { useUser } from "../../hooks/useUser"
import { useLocalStorage } from "../../hooks/useLocalStorage"
import { TutorialMask } from "../../components/TutorialMask"
import { FinishContainer } from "./FinishContainer"

interface CartProps {}

export const Cart: React.FC<CartProps> = ({}) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)

    const navigate = useNavigate()
    const { cart } = useCart()
    const { logout } = useUser()

    const storage = useLocalStorage()
    const [tutorial, setTutorial] = useState(false)    

    const icon_style = { color: "white", height: "10vw", width: "10vw" }

    const handleClose = () => {
        setAnchorEl(null)
    }

    
    useEffect(() => {
        const has_accessed = storage.get('has_accessed')
        if (has_accessed){
            console.log('acessou')
        }else{
            console.log('nao')
            setTutorial(true)
        }
    }, [])    

    return (
        <div className="Cart-Page">
            <div className="title-container">
                <IconButton onClick={(event) => setAnchorEl(event.currentTarget)}>
                    <Avatar sx={icon_style} />
                </IconButton>
                <h2>Carrinho</h2>
                <IconButton onClick={() => navigate("/scan")}>
                    <QrCodeScannerIcon sx={icon_style} />
                </IconButton>
            </div>

            {tutorial && <TutorialMask />}

            <div className="product-list">
                {cart.map((product) => (
                    <Product key={product.id} product={product} />
                ))}
            </div>

            <FinishContainer />

            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
            >
                <MenuItem onClick={handleClose}>Perfil</MenuItem>
                <MenuItem onClick={logout}>Sair</MenuItem>
            </Menu>

        </div>
    )
}
