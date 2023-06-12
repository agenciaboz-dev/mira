import { useContext } from "react"
import CurrentSupplierContext from "../contexts/currentSupplierContext"

export const useCurrentSupplier = () => {
    const currentSupplierContext = useContext(CurrentSupplierContext)
    const currentSupplier = currentSupplierContext.value
    const setCurrentSupplier = currentSupplierContext.setValue

    return { currentSupplier, setCurrentSupplier, ...currentSupplierContext }
}
