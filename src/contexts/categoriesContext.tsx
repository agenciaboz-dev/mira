import { createContext, useEffect, useState } from "react"
import React from "react"
import { useApi } from "../hooks/useApi"

interface CategoriesContextValue {
    value: Category[]
    setValue: (value: Category[]) => void
    refresh: () => void
}

interface CategoriesProviderProps {
    children: React.ReactNode
}

const CategoriesContext = createContext<CategoriesContextValue>({} as CategoriesContextValue)

export default CategoriesContext

export const CategoriesProvider: React.FC<CategoriesProviderProps> = ({ children }) => {
    const [value, setValue] = useState<Category[]>([])
    const api = useApi()

    const refresh = () => {
        api.categories.get({ callback: (response: { data: Category[] }) => setValue(response.data) })
    }

    useEffect(() => {
        refresh()
    }, [])

    return <CategoriesContext.Provider value={{ value, setValue, refresh }}>{children}</CategoriesContext.Provider>
}
