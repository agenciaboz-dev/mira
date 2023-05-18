import React from "react"
import { Menu as MuiMenu, MenuItem } from "@mui/material"
import { useLocalStorage } from "../../hooks/useLocalStorage"
import { useUser } from "../../hooks/useUser"
import { useNavigate } from "react-router-dom"
import { useColors } from "../../hooks/useColors"

interface MenuProps {
    open: boolean
    anchorEl: any
    handleClose: () => void
}

export const Menu: React.FC<MenuProps> = ({ open, anchorEl, handleClose }) => {
    const storage = useLocalStorage()
    const { logout } = useUser()
    const navigate = useNavigate()
    const colors = useColors()

    const menuNavigate = (path: string) => {
        handleClose()
        navigate(path)
    }

    return (
        <MuiMenu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
                "aria-labelledby": "basic-button",
            }}
            PaperProps={{
                sx: {
                    backgroundColor: colors.purple,
                    boxShadow: "none",
                    borderBottomLeftRadius: "2vw",
                    borderBottomRightRadius: "2vw",
                    color: "white",
                },
            }}
        >
            <MenuItem style={{ fontSize: "3vw" }} onClick={() => storage.set("has_accessed", false)}>Resetar Tutorial</MenuItem>
            <MenuItem style={{ fontSize: "3vw" }} onClick={() => menuNavigate("/cart")}>Carrinho</MenuItem>
            <MenuItem style={{ fontSize: "3vw" }} onClick={() => menuNavigate("/profile/account")}>Detalhes da Conta</MenuItem>
            <MenuItem style={{ fontSize: "3vw" }} onClick={logout}>Sair</MenuItem>
        </MuiMenu>
    )
}
