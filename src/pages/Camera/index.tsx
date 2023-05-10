import React, { useState, useEffect, useRef } from "react"
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
import { Product as ProductPage } from "../Product"
import { styles } from "./styles"
import useMeasure from "react-use-measure"

interface CameraProps {}

export const Camera: React.FC<CameraProps> = ({}) => {
    const [scanning, setScanning] = useState(true)
    const [result, setResult] = useState("")
    const [id, setId] = useState(0)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [productPosition, setProductPosition] = useState("")

    const navigate = useNavigate()
    const colors = useColors()
    const validateCode = useValidadeCode()
    const { products } = useProducts()
    const productRef = useRef<HTMLDivElement>(null)
    const [ref, { height }] = useMeasure()

    const handleResult = (result: string) => {
        console.log(result)
        setResult(result)
        setScanning(false)
    }

    const retry = () => {
        setError(false)
        setScanning(true)
        setLoading(false)
        setId(0)
        setResult("")
    }

    const closeProduct = () => {
        setProductPosition("")
        setTimeout(() => retry(), 1000)
    }

    useEffect(() => {
        console.log(result)
        if (result) {
            if (validateCode(result)) {
                setError(false)
                // navigate(`/product/${id}/buying`)
                setId(Number(result.split("/")[1]))
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

    useEffect(() => {
        if (height) setTimeout(() => setProductPosition(`translateY(-${height}px)`), 500)
    }, [height])

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
            {!!id && (
                <ProductPage
                    product_id={id}
                    style={{
                        zIndex: 10,
                        position: "absolute",
                        top: "100vh",
                        left: 0,
                        transition: "1s",
                        transform: productPosition || "",
                    }}
                    innerRef={ref}
                    onClose={closeProduct}
                />
            )}
        </div>
    )
}
