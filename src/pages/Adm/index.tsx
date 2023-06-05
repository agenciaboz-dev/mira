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

interface AdmProps {}

export const Adm: React.FC<AdmProps> = ({}) => {
    const { user } = useUser()
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) navigate("/login")
    }, [location.pathname])

    return (
        <div className="Adm-Page">
            <Sidebar />
            <ProductModal />
            <Routes>
                <Route index element={<Products />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/products" element={<Products />} />
                <Route path="/categories" element={<Categories />} />
            </Routes>
        </div>
    )
}
