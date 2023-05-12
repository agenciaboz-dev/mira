import React from "react"
import { Route, Routes } from "react-router-dom"
import { Account } from "./Account"
import { Header } from "./Header.index"
import "./style.scss"

interface ProfileProps {}

export const Profile: React.FC<ProfileProps> = ({}) => {
    return (
        <div className="Profile-Page">
            <div className="main-container">
                <Header />
                <Routes>
                    <Route path="/account" element={<Account />} />
                </Routes>
            </div>
        </div>
    )
}
