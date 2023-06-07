import { createContext, useEffect, useState } from "react"
import React from "react"
import { Order } from "../definitions/cart"

interface OrderContextValue {
    value: Order | undefined
    setValue: (value: Order | undefined) => void
}

interface OrderProviderProps {
    children: React.ReactNode
}

const OrderContext = createContext<OrderContextValue>({} as OrderContextValue)

export default OrderContext

export const OrdersProvider: React.FC<OrderProviderProps> = ({ children }) => {
    const [value, setValue] = useState<Order>()

    useEffect(() => {
        console.log(value)
    }, [value])

    return <OrderContext.Provider value={{ value, setValue }}>{children}</OrderContext.Provider>
}
