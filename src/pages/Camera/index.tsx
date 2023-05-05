import { Button } from "@mui/material"
import React, { useState, useEffect } from "react"
import { ProductModal } from "../../components/ProductModal"
import { Scanner } from "../../components/Scanner"
import "./style.scss"

interface CameraProps {}

export const Camera: React.FC<CameraProps> = ({}) => {
    const [scanning, setScanning] = useState(true)
    const [productModal, setProductModal] = useState(false)
    const [result, setResult] = useState("")

    const handleResult = (result: string) => {
        console.log(result)
        setResult(result)
        setScanning(false)
    }

    useEffect(() => {
        console.log(result)
        if (result) setProductModal(true)
    }, [result])

    useEffect(() => {
        if (!productModal && result) setResult("")
    }, [productModal])

    return (
        <div className="Camera-Page">
            <Scanner scanning={scanning} handleResult={handleResult} />
            <div className="button-container">
                <Button variant="contained" sx={{ fontSize: "5vw", padding: "3vw" }}>
                    Cancelar leitura
                </Button>
            </div>
            <ProductModal open={productModal} setOpen={setProductModal} result={result} />
        </div>
    )
}
