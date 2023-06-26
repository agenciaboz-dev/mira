import React, { useEffect } from "react"
import { useLocation } from "react-router-dom"

interface ScrollTopProps {}

export const ScrollTop: React.FC<ScrollTopProps> = ({}) => {
    const vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty("--vh", `${vh}px`)

    window.addEventListener("resize", () => {
        const vh = window.innerHeight * 0.01
        document.documentElement.style.setProperty("--vh", `${vh}px`)
    })

    const { pathname } = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])

    return null
}
