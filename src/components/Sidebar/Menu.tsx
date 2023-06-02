import React, { useState, useEffect } from "react"
import { useSidebarMenus } from "../../hooks/useSidebarMenus"
import { MenuItem, SxProps } from "@mui/material"
import colors from "../../colors"
import { useLocation, useNavigate } from "react-router-dom"
import styles from "./styles"

interface MenuProps {
    menu: SidebarMenu
}

export const Menu: React.FC<MenuProps> = ({ menu }) => {
    const Icon = () => menu.icon
    const path = useLocation().pathname
    const navigate = useNavigate()

    const [current, setCurrent] = useState(false)

    const menuStyle: SxProps = {
        ...styles.menu,
        backgroundColor: current ? colors.background : "",
        color: current ? colors.primary : "",
        "&:hover": {
            backgroundColor: current ? colors.background : "",
        },
    }

    useEffect(() => {
        console.log({ path, menu: menu.location })
        if (path.split("/")[1] == menu.location.split("/")[1]) {
            setCurrent(true)
        } else {
            setCurrent(false)
        }
    }, [path])

    return (
        <MenuItem sx={menuStyle} onClick={() => navigate(menu.location)}>
            <Icon />
            <p>{menu.title}</p>
        </MenuItem>
    )
}
