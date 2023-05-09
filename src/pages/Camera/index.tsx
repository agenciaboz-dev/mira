import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../../components/Button"
import { ProductModal } from "../../components/ProductModal"
import { Scanner } from "../../components/Scanner"
import "./style.scss"
import CancelIcon from "@mui/icons-material/Cancel"
import { useColors } from "../../hooks/useColors"
import { useValidadeCode } from "../../hooks/useValidateCode"
import { Product } from "../../definitions/product"
import { useProducts } from "../../hooks/useProducts"
import CircularProgress from "@mui/material/CircularProgress"

interface CameraProps {}

export const Camera: React.FC<CameraProps> = ({}) => {
    const [scanning, setScanning] = useState(true)
    const [result, setResult] = useState("")
    const [product, setProduct] = useState<Product>()
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
    const colors = useColors()
    const validateCode = useValidadeCode()
    const { products } = useProducts()

    const handleResult = (result: string) => {
        console.log(result)
        setLoading(true)
        setResult(result)
        setScanning(false)
    }

    const retry = () => {
        setError(false)
        setScanning(true)
        setLoading(false)
        setResult("")
    }

    useEffect(() => {
        console.log(result)
        if (result) {
            if (validateCode(result)) {
                setError(false)
                setProduct(products.filter((item) => item.id == Number(result.split("/")[1]))[0])
            } else {
                setError(true)
            }
        }
    }, [result])

    useEffect(() => {
        if (loading && error)
            setTimeout(() => {
                setLoading(false)
                setResult("")
            }, 1000)
    }, [error])

    return (
        <div className="Camera-Page">
            <Scanner scanning={scanning} handleResult={handleResult} />
            <div className="button-wrapper">
                <div className="button-container">
                    {loading ? (
                        <CircularProgress style={{ width: "30vw", height: "auto" }} sx={{ color: colors.blue }} />
                    ) : (
                        <>
                            {error && <h2>QR Code não identificado</h2>}
                            <Button
                                disabled={!error}
                                onClick={retry}
                                fullWidth
                                variant="contained"
                                style={{
                                    fontSize: "3.5vw",
                                    padding: "2vw",
                                    color: "white",
                                    background: !error ? "linear-gradient(90deg, #9F9F9F 0%, #565656 91.94%)" : "",
                                }}
                            >
                                {error ? "Tentar novamente" : "Aponte a camera para um QR Code"}
                            </Button>
                            <div className="cancel-button" onClick={() => navigate(-1)}>
                                <CancelIcon sx={{ color: colors.red, width: "8vw", height: "auto" }} />
                                Cancelar leitura
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
