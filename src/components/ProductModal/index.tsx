import {
    Dialog,
    CircularProgress,
    DialogContent,
    DialogContentText,
    DialogTitle,
    DialogActions,
    Button,
} from "@mui/material"
import React, { useRef, useState, useEffect } from "react"
import { Product } from "../../definitions/product"
import { useProducts } from "../../hooks/useProducts"
import CloseIcon from "@mui/icons-material/Close"
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation"
import IconButton from "@mui/material/IconButton"
import HelpIcon from "@mui/icons-material/Help"
import { useColors } from "../../hooks/useColors"
import { styles } from "./styles"
import { CurrencyText } from "../CurrencyText"
import { useValidadeCode } from "../../hooks/useValidateCode"
import { useCart } from "../../hooks/useCart"
import { useNavigate } from "react-router-dom"
import { ProductStory } from "../ProductStory"
import { Form, Formik } from "formik"
import TextField from "@mui/material/TextField/TextField"
import MaskedInput from "react-text-mask"
import { useCurrencyMask } from "../../hooks/useCurrencyMask"
import { useNumberMask } from "../../hooks/useNumberMask"
import { useApi } from "../../hooks/useApi"
import { useCurrentProduct } from "../../hooks/useCurrentProduct"

interface ProductModalProps {}

export const ProductModal: React.FC<ProductModalProps> = ({}) => {
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const { currentProduct, setCurrentProduct, open, setOpen } = useCurrentProduct()

    const currencyMask = useCurrencyMask()
    const numberMask = useNumberMask()
    const api = useApi()
    const { refresh } = useProducts()

    const initialValues: Product = currentProduct || {
        name: "",
        description: "",
        stock: 0,
        id: 0,
        image: "",
        price: 0,
        story: "",
        video: "",
        prep_time: 0,
        usage: "",
        volume: {
            height: 0,
            length: 0,
            width: 0,
        },
    }

    const handleSubmit = (values: Product) => {
        setLoading(true)

        if (currentProduct) {
            api.products.update({
                data: values,
                callback: (response: { data: Product }) => {
                    console.log(response.data)
                    setOpen(false)
                    refresh()
                },
                finallyCallback: () => setLoading(false),
            })
        } else {
            api.products.add({
                data: values,
                callback: (response: { data: Product }) => {
                    setOpen(false)
                    refresh()
                },
                finallyCallback: () => setLoading(false),
            })
        }
    }

    const handleClose = () => {
        setOpen(false)
        setCurrentProduct(null)
    }

    return (
        <Dialog open={open} onClose={handleClose} sx={styles.dialog}>
            <DialogTitle sx={styles.title}>
                <IconButton onClick={handleClose} sx={{ position: "absolute", left: "1vw" }}>
                    <CancelPresentationIcon color="error" sx={styles.close_icon} />
                </IconButton>
                {currentProduct?.name || "Novo produto"}
            </DialogTitle>

            <DialogContent sx={styles.content_container}>
                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                    {({ values, handleChange }) => (
                        <Form>
                            <TextField label="Nome" name="name" value={values.name} onChange={handleChange} />
                            <TextField
                                label="Descrição"
                                name="description"
                                value={values.description}
                                onChange={handleChange}
                            />
                            <MaskedInput
                                mask={currencyMask}
                                guide={false}
                                name="price"
                                value={values.price.toString().replace(".", ",")}
                                onChange={handleChange}
                                render={(ref, props) => <TextField inputRef={ref} {...props} label="Preço" />}
                            />
                            <MaskedInput
                                mask={numberMask}
                                guide={false}
                                name="stock"
                                value={values.stock}
                                onChange={handleChange}
                                render={(ref, props) => <TextField inputRef={ref} {...props} label="Quantidade" />}
                            />
                            <TextField label="História" name="story" value={values.story} onChange={handleChange} />
                            <TextField label="Link de imagem" name="image" value={values.image} onChange={handleChange} />
                            <TextField label="Link de vídeo" name="video" value={values.video} onChange={handleChange} />
                            {currentProduct ? (
                                <Button type="submit" variant="contained" fullWidth>
                                    {loading ? (
                                        <CircularProgress
                                            style={{ width: "1.5rem", height: "auto" }}
                                            sx={{ color: "white" }}
                                        />
                                    ) : (
                                        `Atualizar ${currentProduct.name}`
                                    )}
                                </Button>
                            ) : (
                                <Button type="submit" variant="contained" fullWidth>
                                    {loading ? (
                                        <CircularProgress
                                            style={{ width: "1.5rem", height: "auto" }}
                                            sx={{ color: "white" }}
                                        />
                                    ) : (
                                        `Adicionar produto`
                                    )}
                                </Button>
                            )}
                        </Form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    )
}
