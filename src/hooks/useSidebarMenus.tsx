import CategoryIcon from "@mui/icons-material/Category"
import HandymanIcon from "@mui/icons-material/Handyman"

export const useSidebarMenus = () => {
    const menus: SidebarMenu[] = [
        {
            id: 1,
            title: "Produtos",
            location: "/dashboard/products",
            icon: <HandymanIcon />,
        },
        {
            id: 2,
            title: "Categorias",
            location: "/dashboard/categories",
            icon: <CategoryIcon />,
        },
    ]

    return menus
}
