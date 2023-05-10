import React from "react"
import { Route, Routes } from "react-router-dom"
import { Login } from "./Login"
import "./style.scss"

interface AdmProps {}

export const Adm: React.FC<AdmProps> = ({}) => {
    return (
        <div className="Adm-Page">
            <Routes>
                <Route index element={<Login />} />
            </Routes>
        </div>
    )
}
