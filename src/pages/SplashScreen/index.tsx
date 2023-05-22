import React from "react"
import "./style.scss"
import { useNavigate } from "react-router-dom"

interface SplashScreenProps {}

export const SplashScreen: React.FC<SplashScreenProps> = ({}) => {
    const navigate = useNavigate()

    return (
        <div className="SplashScreen-Page" onClick={() => navigate("/cart")}>
            <img src="/splashscreen.png" alt="SplashScreen" />
            <p className="splashscreen-balloon-text">Olá, sou a Mira!<br />Toque na tela para começar.</p>
        </div>
    )
}