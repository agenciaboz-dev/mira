import {
    Dialog,
    CircularProgress,
    DialogContent,
    DialogTitle,
    Button,
    Box,
    MenuItem,
    RadioGroup,
    Radio,
    FormControlLabel,
} from "@mui/material"
import React, { useRef, useState, useEffect } from "react"
import { useProducts } from "../../hooks/useProducts"
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation"
import IconButton from "@mui/material/IconButton"
import { styles } from "./styles"
import { Form, Formik } from "formik"
import TextField from "@mui/material/TextField/TextField"
import MaskedInput from "react-text-mask"
import { useNumberMask, useCurrencyMask } from "burgos-masks"
import { useApi } from "../../hooks/useApi"
import { useCurrentProduct } from "../../hooks/useCurrentProduct"
import { useSnackbar } from "burgos-snackbar"
import { useCategories } from "../../hooks/useCategories"
import { PreparationAddornment } from "../PreparationAddornment"

interface ProductModalProps {}

interface FormValues extends Product {
    categories_ids: number[]
    preparation_unit: number
}

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
    const { categories } = useCategories()

    const initialValues: FormValues = currentProduct
        ? {
              ...currentProduct,
              price: currentProduct?.price.toString().replace(".", ","),
              weight: currentProduct?.weight.toString().replace(".", ","),
              height: currentProduct?.height.toString().replace(".", ","),
              width: currentProduct?.width.toString().replace(".", ","),
              length: currentProduct?.length.toString().replace(".", ","),
              categories_ids: currentProduct.categories?.map((category) => category.id) || [],
              preparation_unit: 1,
          }
        : {
              name: "",
              description: "",
              stock: 0,
              id: 0,
              image: "",
              price: 0,
              story: "",
              video: "",
              preparation: 0,
              usage: "",
              weight: 0,
              height: 0,
              length: 0,
              width: 0,
              preparation_unit: 1,
              categories_ids: [],
          }

    const handleSubmit = (values: FormValues) => {
        if (loading) return
        // setLoading(true)

        // converter preparation
        let minutesPreparation = values.preparation
        if (values.preparation_unit == 1) {
            minutesPreparation = values.preparation * 60
        } else if (values.preparation_unit == 3) {
            minutesPreparation = values.preparation / 60
        }

        const data = {
            ...values,
            preparation: minutesPreparation,
            categories: values.categories_ids?.map((category) => ({ id: category })),
        }

        console.log(data)

        return

        if (currentProduct) {
            api.products.update({
                data,
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
                data,
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
        <Dialog open={open} onClose={handleClose} sx={styles.dialog} PaperProps={{ sx: styles.paper }}>
            <DialogTitle sx={styles.title}>
                <IconButton onClick={handleClose} sx={{ position: "absolute", right: "1vw" }}>
                    <CancelPresentationIcon color="error" sx={styles.close_icon} />
                </IconButton>
                {currentProduct?.name || "Novo produto"}
            </DialogTitle>

            <DialogContent sx={styles.content_container}>
                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                    {({ values, handleChange }) => (
                        <Form>
                            <TextField required label="Nome" name="name" value={values.name} onChange={handleChange} />
                            <TextField required label="Marca" name="brand" value={values.name} onChange={handleChange} />
                            <Box sx={{ gap: "1vw" }}>
                                <MaskedInput
                                    mask={currencyMask}
                                    guide={false}
                                    name="price"
                                    value={values.price || ""}
                                    onChange={handleChange}
                                    render={(ref, props) => (
                                        <TextField required inputRef={ref} {...props} label="Preço de Venda" />
                                    )}
                                />
                                <MaskedInput
                                    mask={currencyMask}
                                    guide={false}
                                    name="cost"
                                    value={values.price || ""}
                                    onChange={handleChange}
                                    render={(ref, props) => (
                                        <TextField required inputRef={ref} {...props} label="Preço de Custo" />
                                    )}
                                />
                            </Box>

                            <Box sx={{ gap: "1vw" }}>
                                <MaskedInput
                                    mask={numberMask}
                                    guide={false}
                                    name="stock"
                                    value={values.stock || ""}
                                    onChange={handleChange}
                                    render={(ref, props) => (
                                        <TextField
                                            required
                                            inputRef={ref}
                                            {...props}
                                            label="Quantidade"
                                            InputProps={{ endAdornment: <p>unidades</p> }}
                                        />
                                    )}
                                />
                                <MaskedInput
                                    mask={numberMask}
                                    guide={false}
                                    name="preparation"
                                    value={values.preparation || ""}
                                    onChange={handleChange}
                                    render={(ref, props) => (
                                        <TextField
                                            required
                                            inputRef={ref}
                                            {...props}
                                            label="Tempo de preparo"
                                            InputProps={{
                                                endAdornment: (
                                                    <PreparationAddornment
                                                        handleChange={handleChange}
                                                        value={values.preparation_unit}
                                                    />
                                                ),
                                            }}
                                        />
                                    )}
                                />
                            </Box>

                            <Box sx={{ gap: "1vw" }}>
                                <MaskedInput
                                    mask={volumeMask}
                                    guide={false}
                                    name="weight"
                                    value={values.weight || ""}
                                    onChange={handleChange}
                                    render={(ref, props) => (
                                        <TextField
                                            required
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
                                    value={values.width || ""}
                                    onChange={handleChange}
                                    render={(ref, props) => (
                                        <TextField
                                            required
                                            inputRef={ref}
                                            {...props}
                                            label="Largura"
                                            InputProps={{ endAdornment: <p>cm</p> }}
                                        />
                                    )}
                                />
                            </Box>
                            <Box sx={{ gap: "1vw" }}>
                                <MaskedInput
                                    mask={volumeMask}
                                    guide={false}
                                    name="height"
                                    value={values.height || ""}
                                    onChange={handleChange}
                                    render={(ref, props) => (
                                        <TextField
                                            required
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
                                    value={values.length || ""}
                                    onChange={handleChange}
                                    render={(ref, props) => (
                                        <TextField
                                            required
                                            inputRef={ref}
                                            {...props}
                                            label="Comprimento"
                                            InputProps={{ endAdornment: <p>cm</p> }}
                                        />
                                    )}
                                />
                            </Box>

                            <TextField
                                required
                                label="Categorias"
                                select
                                name="categories_ids"
                                value={values.categories_ids!}
                                onChange={handleChange}
                                SelectProps={{ multiple: true }}
                            >
                                <MenuItem value={0} style={{ display: "none" }} disabled></MenuItem>
                                {categories.map((category) => (
                                    <MenuItem key={category.id} value={category.id} style={{ width: "100%" }}>
                                        {category.name}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <TextField
                                required
                                label="Link de imagem"
                                name="image"
                                value={values.image}
                                onChange={handleChange}
                            />

                            <TextField
                                required
                                label="Link de vídeo"
                                name="video"
                                value={values.video}
                                onChange={handleChange}
                            />
                            <TextField
                                required
                                label="Descrição"
                                name="description"
                                value={values.description}
                                onChange={handleChange}
                                multiline
                                minRows={5}
                            />
                            <TextField
                                required
                                label="Como usar"
                                name="usage"
                                value={values.usage}
                                onChange={handleChange}
                                multiline
                                minRows={5}
                            />
                            <TextField
                                required
                                label="História"
                                name="story"
                                value={values.story}
                                onChange={handleChange}
                                multiline
                                minRows={5}
                            />
                            {currentProduct ? (
                                <Button type="submit" variant="contained" fullWidth sx={styles.button}>
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
                                <Button type="submit" variant="contained" fullWidth sx={styles.button}>
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
