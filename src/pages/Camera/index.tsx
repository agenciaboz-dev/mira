import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../../components/Button"
import { ProductModal } from "../../components/ProductModal"
import { Scanner } from "../../components/Scanner"
import "./style.scss"
import CancelIcon from "@mui/icons-material/Cancel"
import { useColors } from "../../hooks/useColors"

interface CameraProps {}

export const Camera: React.FC<CameraProps> = ({}) => {
    const [scanning, setScanning] = useState(true)
    const [productModal, setProductModal] = useState(false)
    const [result, setResult] = useState("")

    const navigate = useNavigate()
    const colors = useColors()

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
            <div className="button-wrapper">
                <div className="button-container">
                    <Button
                        disabled
                        variant="contained"
                        style={{
                            fontSize: "3.5vw",
                            padding: "2vw",
                            color: "white",
                            background: "linear-gradient(90deg, #9F9F9F 0%, #565656 91.94%)",
                        }}
                    >
                        Aponte a camera para um QR Code
                    </Button>
                    <div className="cancel-button" onClick={() => navigate(-1)}>
                        <CancelIcon sx={{ color: colors.red, width: "8vw", height: "auto" }} />
                        Cancelar leitura
                    </div>
                </div>
            </div>
            <ProductModal open={productModal} setOpen={setProductModal} result={result} />
        </div>
    )
}
