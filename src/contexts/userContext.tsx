import { createContext, useState } from "react"
import React from "react"
import { User } from "../definitions/user"

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
    const [value, setValue] = useState<User | null>(null)

    return <UserContext.Provider value={{ value, setValue }}>{children}</UserContext.Provider>
}
