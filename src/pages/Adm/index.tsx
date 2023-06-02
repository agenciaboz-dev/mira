import React from "react"
import { Route, Routes } from "react-router-dom"
import { Dashboard } from "./Dashboard"
import { Login } from "./Login"
import "./style.scss"
import { Sidebar } from "../../components/Sidebar"

interface AdmProps {}

export const Adm: React.FC<AdmProps> = ({}) => {
    return (
        <div className="Adm-Page">
            <Sidebar />
            <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </div>
    )
}
