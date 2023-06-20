import React, { useEffect } from "react"
import { Route, Routes, useLocation, useNavigate } from "react-router-dom"
import { Dashboard } from "./Dashboard"
import { Login } from "./Login"
import "./style.scss"
import { Sidebar } from "../../components/Sidebar"
import { Products } from "./Products"
import { ProductModal } from "../../components/ProductModal"
import { Categories } from "./Categories"
import { useUser } from "../../hooks/useUser"
import { Suppliers } from "./Suppliers"
import { Orders } from "./Orders"
import { Order } from "./Orders/Order"
import { Settings } from "./Settings"
import { Product } from "./Products/Product"
import { useWebsocket } from "../../hooks/useWebsocket"

interface AdmProps {}

export const Adm: React.FC<AdmProps> = ({}) => {
    const { user } = useUser()
    const location = useLocation()
    const navigate = useNavigate()
    const websocket = useWebsocket()

    useEffect(() => {
        if (!user) navigate("/login")
    }, [location.pathname])

    useEffect(() => {
        websocket.send({ adm: user })
    }, [])

    return (
        <div className="Adm-Page">
            <Sidebar />
            <ProductModal />
            <Routes>
                <Route index element={<Products />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<Product />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/suppliers" element={<Suppliers />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/orders/:id" element={<Order />} />
                <Route path="/settings" element={<Settings />} />
            </Routes>
        </div>
    )
}
