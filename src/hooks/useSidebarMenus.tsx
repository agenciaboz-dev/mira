import CategoryIcon from "@mui/icons-material/Category"
import HandymanIcon from "@mui/icons-material/Handyman"
import SellIcon from "@mui/icons-material/Sell"
import FactCheckIcon from "@mui/icons-material/FactCheck"
import ContactsIcon from "@mui/icons-material/Contacts"

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
        {
            id: 3,
            title: "Fornecedores",
            location: "/dashboard/suppliers",
            icon: <SellIcon />,
        },
        {
            id: 4,
            title: "Pedidos",
            location: "/dashboard/orders",
            icon: <FactCheckIcon />,
        },
    ]

    return menus
}
