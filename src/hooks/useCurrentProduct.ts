import { useContext } from "react"
import CurrentProductContext from "../contexts/currentProductContext"

export const useCurrentProduct = () => {
    const currentProductContext = useContext(CurrentProductContext)
    const currentProduct = currentProductContext.value
    const setCurrentProduct = currentProductContext.setValue

    return { currentProduct, setCurrentProduct, ...currentProductContext }
}
