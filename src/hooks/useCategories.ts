import { useContext } from "react"
import CategoriesContext from "../contexts/categoriesContext"

export const useCategories = () => {
    const categoriesContext = useContext(CategoriesContext)
    const categories = categoriesContext.value
    const setCategories = categoriesContext.setValue

    return { categories, setCategories, ...categoriesContext }
}
