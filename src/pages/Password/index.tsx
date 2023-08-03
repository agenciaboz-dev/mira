import React from "react"
import { Box } from "@mui/material"
import { Route, Routes } from "react-router-dom"
import { Forgot } from "./Forgot"
import { Reset } from "./Reset"

interface PasswordProps {}

export const Password: React.FC<PasswordProps> = ({}) => {
    return (
        <Routes>
            <Route path="forgot" element={<Forgot />} />
            <Route path="reset/:hash" element={<Reset />} />
        </Routes>
    )
}
