import React, { useEffect, useState } from "react"
import { Box } from "@mui/material"
import { useLocation, useNavigate } from "react-router-dom"
import logo from "../images/splash.png"
import LinearProgress from "@mui/material/LinearProgress"
import { useColors } from "../hooks/useColors"

interface RedirectProps {}

export const Redirect: React.FC<RedirectProps> = ({}) => {
    const [value, setValue] = useState(0)

    const colors = useColors()
    const path = useLocation().state.path
    const navigate = useNavigate()

    useEffect(() => {
        if (value < 100) setTimeout(() => setValue(value + 1), 10)
    }, [value])

    useEffect(() => {
        if (path) setTimeout(() => navigate(path), 2000)
    }, [])

    return (
        <div
            style={{
                width: "100%",
                height: "100vh",
                backgroundColor: "#53337D",
                backgroundImage: `url(${logo})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <LinearProgress
                value={value}
                variant="determinate"
                color={"info"}
                style={{ width: "70%", height: 10, marginTop: 370, borderRadius: 5 }}
            />
        </div>
    )
}
