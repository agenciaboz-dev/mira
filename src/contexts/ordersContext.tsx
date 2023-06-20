import { createContext, useEffect, useState } from "react"
import React from "react"
import { useApi } from "../hooks/useApi"

export interface Orders {}

interface OrdersContextValue {
    value: Order[]
    setValue: (value: Order[]) => void
    refresh: () => void
}

interface OrdersProviderProps {
    children: React.ReactNode
}

const OrdersContext = createContext<OrdersContextValue>({} as OrdersContextValue)

export default OrdersContext

export const OrdersProvider: React.FC<OrdersProviderProps> = ({ children }) => {
    const api = useApi()
    const [value, setValue] = useState<Order[]>([])

    const refresh = () => {
        setValue([])
        api.orders.get((response: { data: Order[] }) => setValue(response.data))
    }

    useEffect(() => {
        console.log({ orders: value })
    }, [value])

    useEffect(() => {
        refresh()
    }, [])

    return <OrdersContext.Provider value={{ value, setValue, refresh }}>{children}</OrdersContext.Provider>
}
