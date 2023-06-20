import { createContext, useEffect, useState } from "react"
import React from "react"
import { useApi } from "../hooks/useApi"

interface SuppliersContextValue {
    value: Supplier[]
    setValue: (value: Supplier[]) => void
    refresh: () => void
}

interface SuppliersProviderProps {
    children: React.ReactNode
}

const SuppliersContext = createContext<SuppliersContextValue>({} as SuppliersContextValue)

export default SuppliersContext

export const SuppliersProvider: React.FC<SuppliersProviderProps> = ({ children }) => {
    const [value, setValue] = useState<Supplier[]>([])
    const api = useApi()

    const refresh = () => {
        setValue([])
        api.suppliers.get({ callback: (response: { data: Supplier[] }) => setValue(response.data) })
    }

    useEffect(() => {
        refresh()
    }, [])

    return <SuppliersContext.Provider value={{ value, setValue, refresh }}>{children}</SuppliersContext.Provider>
}
