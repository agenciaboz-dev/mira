import { useNavigate } from "react-router-dom"
import { useCart } from "./useCart"

export const useReset = () => {
    const navigate = useNavigate()
    const cart = useCart()

    const reset = () => {
        navigate("/")
        cart.empty()
    }

    return reset
}