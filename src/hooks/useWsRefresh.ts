import { useOrders } from "./useOrders"
import { useProducts } from "./useProducts"
import { useWsReload } from "./useWsReload"

export const useWsRefresh = () => {
    const orders = useOrders()
    const products = useProducts()
    const reload = useWsReload()

    const handleRefresh = (message: { refresh: string; time: number }) => {
        if (message.refresh == "app") {
            reload(message.time)
        } else if (message.refresh == "orders") {
            orders.refresh()
        } else if (message.refresh == "products") {
            products.refresh()
        }
    }

    return handleRefresh
}
