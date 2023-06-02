import { createContext, useState } from "react"
import React from "react"

interface CurrentCategoryContextValue {
    value: Category | null
    setValue: (value: Category | null) => void
    open: boolean
    setOpen: (open: boolean) => void
}

interface CurrentCategoryProviderProps {
    children: React.ReactNode
}

const CurrentCategoryContext = createContext<CurrentCategoryContextValue>({} as CurrentCategoryContextValue)

export default CurrentCategoryContext

export const CurrentCategoryProvider: React.FC<CurrentCategoryProviderProps> = ({ children }) => {
    const [value, setValue] = useState<Category | null>(null)
    const [open, setOpen] = useState(false)

    return (
        <CurrentCategoryContext.Provider value={{ value, setValue, open, setOpen }}>
            {children}
        </CurrentCategoryContext.Provider>
    )
}
