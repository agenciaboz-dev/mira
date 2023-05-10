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

interface ProductModalProps {
    open: boolean
    setOpen: (open: boolean) => void
    product?: Product
}

export const ProductModal: React.FC<ProductModalProps> = ({ open, setOpen, product }) => {
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(true)

    const colors = useColors()

    const initialValues: Product = product || {
        name: "",
        description: "",
        available: 0,
        id: 0,
        image: "",
        price: 0,
        story: "",
        video: "",
    }

    const handleSubmit = (values: Product) => {
        console.log(values)
    }

    const handleClose = (event: {}, reason: "backdropClick" | "escapeKeyDown") => {
        // if (reason) return
        setOpen(false)
    }

    return (
        <Dialog open={open} onClose={handleClose} sx={styles.dialog}>
            <DialogTitle sx={styles.title}>
                <IconButton onClick={() => setOpen(false)}>
                    <CancelPresentationIcon color="error" sx={styles.close_icon} />
                </IconButton>
                {product?.name || "Novo produto"}
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
                            <TextField label="Preço" name="price" value={values.price} onChange={handleChange} />
                            <TextField
                                label="Quantidade"
                                name="available"
                                value={values.available}
                                onChange={handleChange}
                            />
                            <TextField label="História" name="story" value={values.story} onChange={handleChange} />
                            <TextField label="Link de imagem" name="image" value={values.image} onChange={handleChange} />
                            <TextField label="Link de vídeo" name="video" value={values.video} onChange={handleChange} />
                            {product ? (
                                <Button type="submit" variant="contained" fullWidth>
                                    Atualizar {product.name}
                                </Button>
                            ) : (
                                <Button type="submit" variant="contained" fullWidth>
                                    Adicionar produto
                                </Button>
                            )}
                        </Form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    )
}
