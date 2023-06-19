import { createContext, useEffect, useState } from "react"
import React from "react"
import { Address } from "../definitions/user"
import UserContext from "./userContext"

interface AddressContextValue {
    value: Address | undefined
    setValue: (value: Address | undefined) => void
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
