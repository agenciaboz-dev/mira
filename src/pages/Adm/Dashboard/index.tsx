import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useUser } from "../../../hooks/useUser"
import "./style.scss"

interface DashboardProps {}

export const Dashboard: React.FC<DashboardProps> = ({}) => {
    const { user } = useUser()
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) navigate("/adm")
    }, [])
    return (
        <div className="Dashboard-Component">
            <h2>Olá, {user?.name}</h2>
        </div>
    )
}
