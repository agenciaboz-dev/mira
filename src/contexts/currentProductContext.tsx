import { createContext, useState } from "react"
import React from "react"

interface CurrentProductContextValue {
    value: Product | null
    setValue: (value: Product | null) => void
    open: boolean
    setOpen: (open: boolean) => void
}

interface CurrentProductProviderProps {
    children: React.ReactNode
}

const CurrentProductContext = createContext<CurrentProductContextValue>({} as CurrentProductContextValue)

export default CurrentProductContext

export const CurrentProductProvider: React.FC<CurrentProductProviderProps> = ({ children }) => {
    const [value, setValue] = useState<Product | null>(null)
    const [open, setOpen] = useState(false)

    return (
        <CurrentProductContext.Provider value={{ value, setValue, open, setOpen }}>
            {children}
        </CurrentProductContext.Provider>
    )
}
