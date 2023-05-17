import React from "react"
import "./style.scss"

interface SplashScreenProps {}

export const SplashScreen: React.FC<SplashScreenProps> = ({}) => {
    return (
        <div className="SplashScreen-Page">
            <img src="/splashscreen.png" alt="SplashScreen" />
        </div>
    )
}
