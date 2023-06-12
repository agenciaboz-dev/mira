import { useContext } from "react"
import SuppliersContext from "../contexts/suppliersContext"

export const useSuppliers = () => {
    const suppliersContext = useContext(SuppliersContext)
    const suppliers = suppliersContext.value
    const setSuppliers = suppliersContext.setValue

    return { suppliers, setSuppliers, ...suppliersContext }
}
