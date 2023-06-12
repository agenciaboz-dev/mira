import { createContext, useState } from "react"
import React from "react"

interface CurrentSupplierContextValue {
    value: Supplier | null
    setValue: (value: Supplier | null) => void
    open: boolean
    setOpen: (open: boolean) => void
}

interface CurrentSupplierProviderProps {
    children: React.ReactNode
}

const CurrentSupplierContext = createContext<CurrentSupplierContextValue>({} as CurrentSupplierContextValue)

export default CurrentSupplierContext

export const CurrentSupplierProvider: React.FC<CurrentSupplierProviderProps> = ({ children }) => {
    const [value, setValue] = useState<Supplier | null>(null)
    const [open, setOpen] = useState(false)

    return (
        <CurrentSupplierContext.Provider value={{ value, setValue, open, setOpen }}>
            {children}
        </CurrentSupplierContext.Provider>
    )
}
