import React, { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"

interface RedirectProps {}

export const Redirect: React.FC<RedirectProps> = ({}) => {
    const path = useLocation().state.path
    const navigate = useNavigate()

    useEffect(() => {
        if (path) setTimeout(() => navigate(path), 5000)
    }, [])
    return <div className="Redirect-Component"></div>
}
