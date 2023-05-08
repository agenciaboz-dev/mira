import { useContext } from "react"
import ChartContext from "../contexts/chartContext"

export const useChart = () => {
    const chartContext = useContext(ChartContext)

    return { chart: chartContext.value, setChart: chartContext.setValue }
}
