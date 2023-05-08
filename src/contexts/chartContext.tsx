import { createContext, useState } from "react"
import React from "react"
import { Product } from "../definitions/product"

interface ChartContextValue {
    value: Product[]
    setValue: (value: Product[]) => void
}

interface ChartProviderProps {
    children: React.ReactNode
}

const ChartContext = createContext<ChartContextValue>({} as ChartContextValue)

export default ChartContext

export const ChartProvider: React.FC<ChartProviderProps> = ({ children }) => {
    const [value, setValue] = useState<Product[]>([])

    return <ChartContext.Provider value={{ value, setValue }}>{children}</ChartContext.Provider>
}
