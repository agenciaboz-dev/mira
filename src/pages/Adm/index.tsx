import React from "react"
import { Route, Routes } from "react-router-dom"
import { Dashboard } from "./Dashboard"
import { Login } from "./Login"
import "./style.scss"
import { Sidebar } from "../../components/Sidebar"
import { Products } from "./Products"
import { ProductModal } from "../../components/ProductModal"
import { Categories } from "./Categories"

interface AdmProps {}

export const Adm: React.FC<AdmProps> = ({}) => {
    return (
        <div className="Adm-Page">
            <Sidebar />
            <ProductModal />
            <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/products" element={<Products />} />
                <Route path="/categories" element={<Categories />} />
            </Routes>
        </div>
    )
}
