import { createContext, useEffect, useState } from "react"
import React from "react"
import { Address as AddressType } from "../definitions/user"

interface Address extends AddressType {
    delivery?: boolean
}

interface AddressContextValue {
    value: Address | undefined
    setValue: (value: Address) => void
}

interface AddressProviderProps {
    children: React.ReactNode
}

const AddressContext = createContext<AddressContextValue>({} as AddressContextValue)

export default AddressContext

export const AddressProvider: React.FC<AddressProviderProps> = ({ children }) => {
    const [value, setValue] = useState<Address>()

    useEffect(() => {
        console.log({ address: value })
    }, [value])

    return <AddressContext.Provider value={{ value, setValue }}>{children}</AddressContext.Provider>
}
