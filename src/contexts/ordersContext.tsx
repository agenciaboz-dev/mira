import { createContext, useState } from "react"
import React from "react"
import { Order } from "../definitions/cart"

interface OrdersContextValue {
    value: Order[]
    setValue: (value: Order[]) => void
}

interface OrdersProviderProps {
    children: React.ReactNode
}

const OrdersContext = createContext<OrdersContextValue>({} as OrdersContextValue)

export default OrdersContext

export const OrdersProvider: React.FC<OrdersProviderProps> = ({ children }) => {
    const [value, setValue] = useState<Order[]>([])

    return <OrdersContext.Provider value={{ value, setValue }}>{children}</OrdersContext.Provider>
}
