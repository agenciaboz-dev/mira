import { useContext, useEffect } from "react"
import AddressContext from "../contexts/addressContext"

export const useAddress = () => {
    const addressContext = useContext(AddressContext)

    return { address: addressContext.value, setAddress: addressContext.setValue }
}
