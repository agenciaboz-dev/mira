import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import UserContext from "../contexts/userContext"
import { useLocalStorage } from "./useLocalStorage"

export const useUser = () => {
    const userContext = useContext(UserContext)
    const navigate = useNavigate()
    const storage = useLocalStorage()

    const logout = () => {
        userContext.setValue(null)
        storage.set("mira.user", null)
        navigate("/")
    }

    return { user: userContext.value, setUser: userContext.setValue, logout }
}
