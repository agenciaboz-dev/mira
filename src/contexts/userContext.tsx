import { createContext, useEffect, useState } from "react"
import React from "react"
import { User } from "../definitions/user"
import { useLocalStorage } from "../hooks/useLocalStorage"
import { useNavigate } from "react-router-dom"

interface UserContextValue {
    value: User | null
    setValue: (value: User | null) => void
}

interface UserProviderProps {
    children: React.ReactNode
}

const UserContext = createContext<UserContextValue>({} as UserContextValue)

export default UserContext

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const storage = useLocalStorage()
    const navigate = useNavigate()
    const [value, setValue] = useState<User | null>(storage.get("mira.user"))

    useEffect(() => {
        console.log({ user: value })

        if (value) {
            const orders = value.orders

            if (orders?.length > 0) {
                const order = orders[orders.length - 1]

                if (!order.review) {
                    navigate("/review", { state: { order: order } })
                }
            }
        }

        if (storage.get("mira.rememberme")) {
            storage.set("mira.user", value)
        }
    }, [value])

    return <UserContext.Provider value={{ value, setValue }}>{children}</UserContext.Provider>
}
