import { useContext, useEffect } from "react"
import AddressContext from "../contexts/addressContext"
import { useUser } from "./useUser"

export const useAddress = () => {
    const { user } = useUser()
    const addressContext = useContext(AddressContext)

    useEffect(() => {
        addressContext.setValue(user!.addresses[0])
    }, [])

    return { address: addressContext.value, setAddress: addressContext.setValue }
}
