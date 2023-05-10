import React from "react"
import { Route, Routes } from "react-router-dom"
import { Dashboard } from "./Dashboard"
import { Login } from "./Login"
import "./style.scss"

interface AdmProps {}

export const Adm: React.FC<AdmProps> = ({}) => {
    return (
        <div className="Adm-Page">
            <Routes>
                <Route index element={<Login />} />
                <Route path='/dashboard' element={<Dashboard />} />
            </Routes>
        </div>
    )
}
