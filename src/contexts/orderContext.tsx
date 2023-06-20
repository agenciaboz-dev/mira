import { createContext, useEffect, useState } from "react"
import React from "react"
import { Order } from "../definitions/cart"

interface OrderContextValue {
    value: Order | undefined
    setValue: (value: Order | undefined) => void
    quotation: Quotation | undefined
    setQuotation: (id: Quotation) => void
}

interface OrderProviderProps {
    children: React.ReactNode
}

const OrderContext = createContext<OrderContextValue>({} as OrderContextValue)

export default OrderContext

export const OrdersProvider: React.FC<OrderProviderProps> = ({ children }) => {
    const [value, setValue] = useState<Order>()
    const [quotation, setQuotation] = useState<Quotation>()

    useEffect(() => {
        console.log(value)
    }, [value])

    return <OrderContext.Provider value={{ value, setValue, quotation, setQuotation }}>{children}</OrderContext.Provider>
}
