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
import { useCart } from "../../hooks/useCart"
import { useApi } from "../../hooks/useApi"

interface CameraProps {}

export const Camera: React.FC<CameraProps> = ({}) => {
    const [scanning, setScanning] = useState(true)
    const [result, setResult] = useState("")
    const [product, setProduct] = useState<Product>()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [productPosition, setProductPosition] = useState("")

    const navigate = useNavigate()
    const colors = useColors()
    const validateCode = useValidadeCode()
    const { products } = useProducts()
    const { cart } = useCart()
    const api = useApi()
    const [productRef, productView] = useMeasure()
    const [cameraRef, cameraView] = useMeasure()

    const handleResult = (result: string) => {
        console.log(result)
        setResult(result)
        setScanning(false)
    }

    const retry = () => {
        setError("")
        setScanning(true)
        setLoading(false)
        setProduct(undefined)
        setResult("")
    }

    const productInCart = (id: number) => {
        let exists = false
        cart.map((item) => {
            if (item.id == id) {
                exists = true
                return
            }
        })

        return exists
    }

    const closeProduct = () => {
        setProductPosition("")
        setTimeout(() => retry(), 1000)
    }

    useEffect(() => {
        console.log(result)
        if (result && !error) {
            setLoading(true)
            if (validateCode(result)) {
                if (productInCart(Number(result.split("/")[1]))) {
                    setError("Produto já está no carrinho")
                } else {
                    api.products.id({
                        data: { id: Number(result.split("/")[1]) },
                        callback: (response: { data: Product }) => {
                            setProduct(response.data)
                        },
                    })
                }
            } else {
                setError("QR Code não identificado")
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
        if (productView.height)
            setTimeout(
                () =>
                    setProductPosition(
                        `translateY(-${productView.height <= cameraView.height ? productView.height : cameraView.height}px)`
                    ),
                500
            )
    }, [productView.height])

    return (
        <div className="Camera-Page" ref={cameraRef}>
            <Scanner scanning={scanning} handleResult={handleResult} />
            <div className="button-wrapper">
                <div className="button-container">
                    {loading ? (
                        <CircularProgress style={{ width: "30vw", height: "auto" }} sx={{ color: colors.blue }} />
                    ) : (
                        <>
                            <h2>{error}</h2>
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
            {product && (
                <ProductPage
                    product={product}
                    style={{
                        zIndex: 10,
                        position: "absolute",
                        top: "100vh",
                        left: 0,
                        transition: "1s",
                        transform: productPosition || "",
                    }}
                    innerRef={productRef}
                    onClose={closeProduct}
                />
            )}
        </div>
    )
}
