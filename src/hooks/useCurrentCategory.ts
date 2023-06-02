import { useContext } from "react"
import CurrentCategoryContext from "../contexts/currentCategoryContext"

export const useCurrentCategory = () => {
    const currentCategoryContext = useContext(CurrentCategoryContext)
    const currentCategory = currentCategoryContext.value
    const setCurrentCategory = currentCategoryContext.setValue

    return { currentCategory, setCurrentCategory, ...currentCategoryContext }
}
