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
                    borderBottomLeftRadius: "8vw",
                    borderBottomRightRadius: "8vw",
                    color: "white",
                    marginTop: "-4vw",
                },
            }}
        >
            <MenuItem onClick={() => storage.set("has_accessed", false)}>reset tutorial</MenuItem>
            <MenuItem onClick={() => menuNavigate("/cart")}>Carrinho</MenuItem>
            <MenuItem onClick={() => menuNavigate("/profile/account")}>Detalhes da Conta</MenuItem>
            <MenuItem onClick={logout}>Sair</MenuItem>
        </MuiMenu>
    )
}
