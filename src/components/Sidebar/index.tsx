import { Box } from "@mui/material"
import React from "react"
import { useSidebarMenus } from "../../hooks/useSidebarMenus"
import { Menu } from "./Menu"
import styles from "./styles"
import { ReactComponent as LogoIcon } from "../../images/logo.svg"
import LogoutIcon from "@mui/icons-material/Logout"

interface SidebarProps {}

export const Sidebar: React.FC<SidebarProps> = ({}) => {
    const menus = useSidebarMenus()
    return (
        <Box sx={styles.body}>
            <LogoIcon style={styles.logo} />
            {menus.map((item) => (
                <Menu key={item.id} menu={item} />
            ))}
            <Menu style={{ marginTop: "auto" }} menu={{ title: "Sair", location: "/login", icon: <LogoutIcon /> }} />
        </Box>
    )
}
