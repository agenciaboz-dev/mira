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
                    marginLeft: "1vw",
                    marginTop: "2vw",
                },
            }}
        >
            <MenuItem
                onClick={() => {
                    storage.set("has_accessed", false)
                    storage.set("mira.seen_similar_items_tutorial", false)
                }}
            >
                Resetar Tutoriais
            </MenuItem>
            <MenuItem onClick={() => menuNavigate("/cart")}>Carrinho</MenuItem>
            <MenuItem onClick={() => menuNavigate("/profile/account")}>Detalhes da Conta</MenuItem>
            <MenuItem onClick={() => menuNavigate("/profile/address")}>Endereço de Entrega</MenuItem>
            <MenuItem onClick={() => menuNavigate("/profile/financial")}>Financeiro</MenuItem>
            <MenuItem onClick={logout}>Sair</MenuItem>
        </MuiMenu>
    )
}
