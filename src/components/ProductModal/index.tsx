import { Dialog, CircularProgress, DialogContent, DialogTitle, Button, Box } from "@mui/material"
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
import { useNumberMask, useCurrencyMask } from "burgos-masks"
import { useApi } from "../../hooks/useApi"
import { useCurrentProduct } from "../../hooks/useCurrentProduct"
import { useSnackbar } from "burgos-snackbar"

interface ProductModalProps {}

export const ProductModal: React.FC<ProductModalProps> = ({}) => {
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    const currencyMask = useCurrencyMask()
    const numberMask = useNumberMask({})
    const volumeMask = useNumberMask({ allowDecimal: true })
    const api = useApi()
    const { refresh } = useProducts()
    const { currentProduct, setCurrentProduct, open, setOpen } = useCurrentProduct()
    const { snackbar } = useSnackbar()

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
        weight: 0,
        height: 0,
        length: 0,
        width: 0,
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
                    snackbar({ severity: "success", text: "Produto atualizado" })
                },
                finallyCallback: () => setLoading(false),
            })
        } else {
            api.products.add({
                data: values,
                callback: (response: { data: Product }) => {
                    setOpen(false)
                    refresh()
                    snackbar({ severity: "success", text: "Produto adicionado" })
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
                            <Box sx={{ gap: "1vw" }}>
                                <MaskedInput
                                    mask={currencyMask}
                                    guide={false}
                                    name="price"
                                    value={values.price ? values.price.toString().replace(".", ",") : ""}
                                    onChange={handleChange}
                                    render={(ref, props) => <TextField inputRef={ref} {...props} label="Preço" />}
                                />
                                <MaskedInput
                                    mask={numberMask}
                                    guide={false}
                                    name="stock"
                                    value={values.stock || ""}
                                    onChange={handleChange}
                                    render={(ref, props) => (
                                        <TextField
                                            inputRef={ref}
                                            {...props}
                                            label="Quantidade"
                                            InputProps={{ endAdornment: <p>unidades</p> }}
                                        />
                                    )}
                                />
                            </Box>
                            <Box sx={{ gap: "1vw" }}>
                                <MaskedInput
                                    mask={volumeMask}
                                    guide={false}
                                    name="weight"
                                    value={values.weight ? values.weight.toString().replace(".", ",") : ""}
                                    onChange={handleChange}
                                    render={(ref, props) => (
                                        <TextField
                                            inputRef={ref}
                                            {...props}
                                            label="Peso"
                                            InputProps={{ endAdornment: <p>kg</p> }}
                                        />
                                    )}
                                />
                                <MaskedInput
                                    mask={volumeMask}
                                    guide={false}
                                    name="width"
                                    value={values.width ? values.width.toString().replace(".", ",") : ""}
                                    onChange={handleChange}
                                    render={(ref, props) => (
                                        <TextField
                                            inputRef={ref}
                                            {...props}
                                            label="Largura"
                                            InputProps={{ endAdornment: <p>cm</p> }}
                                        />
                                    )}
                                />
                                <MaskedInput
                                    mask={volumeMask}
                                    guide={false}
                                    name="height"
                                    value={values.height ? values.height.toString().replace(".", ",") : ""}
                                    onChange={handleChange}
                                    render={(ref, props) => (
                                        <TextField
                                            inputRef={ref}
                                            {...props}
                                            label="Altura"
                                            InputProps={{ endAdornment: <p>cm</p> }}
                                        />
                                    )}
                                />
                                <MaskedInput
                                    mask={volumeMask}
                                    guide={false}
                                    name="length"
                                    value={values.length ? values.length.toString().replace(".", ",") : ""}
                                    onChange={handleChange}
                                    render={(ref, props) => (
                                        <TextField
                                            inputRef={ref}
                                            {...props}
                                            label="Comprimento"
                                            InputProps={{ endAdornment: <p>cm</p> }}
                                        />
                                    )}
                                />
                            </Box>
                            <TextField label="Link de imagem" name="image" value={values.image} onChange={handleChange} />
                            <TextField label="Link de vídeo" name="video" value={values.video} onChange={handleChange} />
                            <TextField
                                label="Descrição"
                                name="description"
                                value={values.description}
                                onChange={handleChange}
                                multiline
                                minRows={5}
                            />
                            <TextField
                                label="Como usar"
                                name="usage"
                                value={values.usage}
                                onChange={handleChange}
                                multiline
                                minRows={5}
                            />
                            <TextField
                                label="História"
                                name="story"
                                value={values.story}
                                onChange={handleChange}
                                multiline
                                minRows={5}
                            />
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
