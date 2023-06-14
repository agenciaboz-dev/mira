import { createContext, useEffect, useState } from "react"
import React from "react"
import { useLocalStorage } from "../hooks/useLocalStorage"

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
    const [value, setValue] = useState<User | null>(null)

    useEffect(() => {
        console.log({ user: value })

        if (storage.get("mira.rememberme")) {
            storage.set("mira.user", value)
        }
    }, [value])

    return <UserContext.Provider value={{ value, setValue }}>{children}</UserContext.Provider>
}
