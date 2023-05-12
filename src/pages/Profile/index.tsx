import React, { useEffect } from "react"
import { Route, Routes, useNavigate } from "react-router-dom"
import { useUser } from "../../hooks/useUser"
import { Account } from "./Account"
import { Header } from "./Header.index"
import "./style.scss"
import { Snackbar, Alert } from "@mui/material"
import { useSnackbar } from "../../hooks/useSnackbar"

interface ProfileProps {}

export const Profile: React.FC<ProfileProps> = ({}) => {
    const { user } = useUser()
    const navigate = useNavigate()
    const snackbar = useSnackbar()

    useEffect(() => {
        if (!user) navigate("/login")
    }, [])

    return (
        <div className="Profile-Page">
            <div className="main-container">
                <Header />
                {user && (
                    <Routes>
                        <Route path="/account" element={<Account user={user} />} />
                    </Routes>
                )}
            </div>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() => snackbar.setOpen(false)}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
                <Alert onClose={() => snackbar.setOpen(false)} severity={snackbar.severity} sx={{ width: "100%" }}>
                    {snackbar.text}
                </Alert>
            </Snackbar>
        </div>
    )
}
