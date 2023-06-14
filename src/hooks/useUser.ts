import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import UserContext from "../contexts/userContext"
import { useLocalStorage } from "./useLocalStorage"
import { useCart } from "./useCart"

export const useUser = () => {
    const userContext = useContext(UserContext)
    const navigate = useNavigate()
    const storage = useLocalStorage()
    const {setCart} = useCart()

    const logout = () => {
        userContext.setValue(null)
        storage.set("mira.user", null)
        navigate("/")
        setCart([])
    }

    return { user: userContext.value, setUser: userContext.setValue, logout }
}
