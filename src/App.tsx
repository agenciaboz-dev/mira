import React from "react"
import { Route, Routes } from "react-router"
import { BrowserRouter } from "react-router-dom"
import { Scanner } from "./components/Scanner"
import { Camera } from "./pages/Camera"
import "./sass/_all.scss"

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Camera />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
