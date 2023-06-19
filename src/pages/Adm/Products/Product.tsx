import { Autocomplete, Box, Button, CircularProgress, IconButton, MenuItem, Paper, TextField } from "@mui/material"
import React, { useEffect, useState } from "react"
import styles from "./styles"
import { useNavigate, useParams } from "react-router-dom"
import ForwardIcon from "@mui/icons-material/Forward"
import colors from "../../../colors"
import { Avatar, ExtFile, FileInputButton } from "@files-ui/react"
import { useCurrencyMask, useNumberMask } from "burgos-masks"
import { useApi } from "../../../hooks/useApi"
import { useProducts } from "../../../hooks/useProducts"
import { useSnackbar } from "burgos-snackbar"
import { useCategories } from "../../../hooks/useCategories"
import { useSuppliers } from "../../../hooks/useSuppliers"
import { Form, Formik, useFormikContext } from "formik"
import MaskedInput from "react-text-mask"
import { PreparationAddornment } from "../../../components/PreparationAddornment"
import { useConfirmDialog } from "burgos-confirm"

interface ProductProps {}

interface FormValues extends Product {
    categories_ids: number[]
    prep_unit: number
}

interface PriceContainerProps {
    values: FormValues
    handleChange: {
        (e: React.ChangeEvent<any>): void
        <T = string | React.ChangeEvent<any>>(field: T): T extends React.ChangeEvent<any>
            ? void
            : (e: string | React.ChangeEvent<any>) => void
    }
}

const numerize = (value: number | string) => {
    return Number(
        value
            .toString()
            .replace(/[^,\d]/g, "")
            .replace(",", ".")
    )
}

const stringify = (value: number) => {
    return value.toFixed(2).toString().replace(".", ",")
}

const PriceContainer: React.FC<PriceContainerProps> = ({ values, handleChange }) => {
    const currencyMask = useCurrencyMask()
    const percentageMask = useNumberMask({ allowDecimal: false })

    const { setFieldValue } = useFormikContext()

    useEffect(() => {
        if (values.profit) {
            const price = numerize(values.cost) * (numerize(values.profit) / 100 + 1)
            setFieldValue("price", stringify(price))
        } else {
            setFieldValue("price", "")
        }
    }, [values.profit])

    return (
        <Box sx={styles.inputContainer}>
            <MaskedInput
                mask={currencyMask}
                guide={false}
                name="cost"
                value={values.cost || ""}
                onChange={handleChange}
                render={(ref, props) => <TextField required inputRef={ref} {...props} label="Preço de custo" />}
            />
            <MaskedInput
                mask={percentageMask}
                guide={false}
                name="profit"
                value={values.profit || ""}
                onChange={handleChange}
                render={(ref, props) => (
                    <TextField
                        required
                        inputRef={ref}
                        {...props}
                        label="Margem de lucro"
                        InputProps={{ endAdornment: <p>%</p> }}
                    />
                )}
            />
            <MaskedInput
                mask={currencyMask}
                guide={false}
                name="price"
                value={values.price || ""}
                render={(ref, props) => <TextField required inputRef={ref} {...props} label="Preço de Venda" />}
            />
        </Box>
    )
}

export const Product: React.FC<ProductProps> = ({}) => {
    const id = useParams().id as string
    const products = useProducts()
    const product = products.find(id)
    const navigate = useNavigate()
    const numberMask = useNumberMask({})
    const volumeMask = useNumberMask({ allowDecimal: true, decimalLimit: 5 })
    const api = useApi()

    const { refresh } = useProducts()
    const { snackbar } = useSnackbar()
    const { confirm } = useConfirmDialog()
    const { categories } = useCategories()
    const { suppliers } = useSuppliers()

    const [loading, setLoading] = useState(false)
    const [deleting, setDeleting] = useState(false)
    const [files, setFiles] = useState<ExtFile[]>([])
    const [supplier, setSupplier] = useState<Supplier | undefined>(product?.supplier || suppliers[0])

    const initialValues: FormValues = product
        ? {
              ...product,
              price: product?.price.toString().replace(".", ","),
              profit: product?.profit.toString().replace(".", ","),
              cost: product?.cost.toString().replace(".", ","),
              weight: product?.weight.toString().replace(".", ","),
              height: product?.height.toString().replace(".", ","),
              width: product?.width.toString().replace(".", ","),
              length: product?.length.toString().replace(".", ","),
              categories_ids: product.categories?.map((category) => category.id) || [],
          }
        : {
              name: "",
              description: "",
              stock: 0,
              stock_warehouse: 0,
              stock_type: 0,
              id: 0,
              image: "",
              price: 0,
              profit: 0,
              cost: 0,
              brand: "",
              story: "",
              video: "",
              preparation: 0,
              prep_unit: 1,
              usage: "",
              weight: 0,
              height: 0,
              length: 0,
              width: 0,
              supplier: {
                  id: 0,
                  code: "",
                  name: "",
                  document: "",
                  contact: "",
              },
              categories_ids: [],
          }

    const handleSubmit = (values: FormValues) => {
        if (loading) return
        if (files.length == 0 && !values.image) {
            console.log(values.image)
            snackbar({ severity: "warning", text: "Envie uma imagem" })
            return
        }

        setLoading(true)

        const data = {
            ...values,
            categories: values.categories_ids?.map((category) => ({ id: category })),
            supplier_id: supplier!.id,
        }

        const formData = new FormData()
        console.log(files)
        if (files.length > 0) formData.append("file", files[0].file!)
        formData.append("data", JSON.stringify(data))

        if (product) {
            api.products.update({
                data: formData,
                callback: (response: { data: Product }) => {
                    console.log(response.data)
                    refresh()
                    snackbar({ severity: "success", text: "Produto atualizado" })
                    navigate("/dashboard/products")
                },
                finallyCallback: () => setLoading(false),
            })
        } else {
            api.products.add({
                data: formData,
                callback: (response: { data: Product }) => {
                    refresh()
                    snackbar({ severity: "success", text: "Produto adicionado" })
                    navigate("/dashboard/products")
                },
                finallyCallback: () => setLoading(false),
            })
        }
    }

    const handleDelete = () => {
        confirm({
            content: "Deseja remover esse produto?",
            title: "Remover produto",
            onConfirm: () => {
                setDeleting(true)
                api.products.delete({
                    data: product,
                    callback: (response: { data: Product }) => {
                        refresh()
                        snackbar({
                            severity: "warning",
                            text: "Produto deletado",
                        })
                        navigate("/dashboard/products")
                    },
                    finallyCallback: () => setDeleting(false),
                })
            },
        })
    }

    const handleSupplierName = (event: React.SyntheticEvent<Element, Event>, value: Supplier | null) => {
        console.log(value)
        setSupplier(value || undefined)
    }

    return (
        <Paper sx={{ ...styles.body, margin: "1vw" }} elevation={5}>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                {({ handleChange, values }) => (
                    <Form
                        style={{
                            position: "relative",
                            flexDirection: "column",
                            gap: "1vw",
                            height: "45vw",
                            overflowY: "auto",
                            paddingTop: "0.4vw",
                            width: "100%",
                        }}
                    >
                        <Box sx={styles.header}>
                            <IconButton onClick={() => navigate("/dashboard/products")}>
                                <ForwardIcon
                                    sx={{ color: colors.primary, transform: "rotate(180deg)", width: "3vw", height: "3vw" }}
                                />
                            </IconButton>
                            <Box sx={styles.inputContainer}>
                                {product && (
                                    <Button variant="outlined" color="error" onClick={handleDelete}>
                                        {deleting ? <CircularProgress size="1.5rem" color="error" /> : "Deletar"}
                                    </Button>
                                )}
                                <Button variant="contained" type="submit">
                                    {loading ? <CircularProgress size="1.5rem" sx={{ color: "white" }} /> : "Salvar"}
                                </Button>
                            </Box>
                        </Box>
                        <TextField required label="Nome" name="name" value={values.name} onChange={handleChange} />

                        <Box sx={styles.inputContainer}>
                            {/* left-inputs */}
                            <Box sx={styles.formContainer}>
                                <PriceContainer values={values} handleChange={handleChange} />
                                <Box sx={styles.inputContainer}>
                                    <Autocomplete
                                        disablePortal
                                        isOptionEqualToValue={(option, value) => option.id == value.id}
                                        disableClearable={true}
                                        options={suppliers.map((supplier) => ({ ...supplier, label: supplier.code }))}
                                        value={{ ...supplier!, label: supplier?.code }}
                                        onChange={handleSupplierName}
                                        sx={{ width: "100%" }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                required
                                                label="Código do fornecedor"
                                                name="supplier.code"
                                            />
                                        )}
                                    />
                                    <Autocomplete
                                        disablePortal
                                        isOptionEqualToValue={(option, value) => option.id == value.id}
                                        disableClearable={true}
                                        options={suppliers.map((supplier) => ({ ...supplier, label: supplier.name }))}
                                        value={{ ...supplier!, label: supplier?.name }}
                                        onChange={handleSupplierName}
                                        sx={{ width: "100%" }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                required
                                                label="Nome do fornecedor"
                                                name="supplier.name"
                                            />
                                        )}
                                    />
                                </Box>

                                <Box sx={styles.inputContainer}>
                                    <TextField
                                        required
                                        label="Marca"
                                        name="brand"
                                        value={values.brand}
                                        onChange={handleChange}
                                    />
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
                                </Box>

                                <Box sx={styles.inputContainer}>
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
                                                label="Estoque loja"
                                                placeholder="Quantidade na loja"
                                                InputProps={{ endAdornment: <p>unidades</p> }}
                                            />
                                        )}
                                    />
                                    <MaskedInput
                                        mask={numberMask}
                                        guide={false}
                                        name="stock_warehouse"
                                        value={values.stock_warehouse || ""}
                                        onChange={handleChange}
                                        render={(ref, props) => (
                                            <TextField
                                                required
                                                inputRef={ref}
                                                {...props}
                                                label="Estoque galpão"
                                                placeholder="Quantidade no galpão"
                                                InputProps={{ endAdornment: <p>unidades</p> }}
                                            />
                                        )}
                                    />
                                </Box>

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
                                            label="Tempo médio de preparo"
                                            InputProps={{
                                                endAdornment: (
                                                    <PreparationAddornment
                                                        handleChange={handleChange}
                                                        value={values.prep_unit}
                                                    />
                                                ),
                                            }}
                                        />
                                    )}
                                />

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
                            </Box>

                            {/* right-inputs */}
                            <Box sx={styles.formContainer}>
                                <Box sx={styles.inputContainer}>
                                    <TextField
                                        required
                                        label="Link de imagem"
                                        name="image"
                                        value={values.image}
                                        onChange={handleChange}
                                        disabled
                                    />
                                    <FileInputButton
                                        onChange={(files) => setFiles(files)}
                                        value={files}
                                        behaviour="replace"
                                        label="Enviar imagem"
                                        accept="image/*"
                                        color={colors.primary}
                                        style={{ width: "12vw", padding: "0.5vw" }}
                                    />
                                </Box>
                                <Avatar
                                    src={files[0]?.file || values.image}
                                    readOnly
                                    smartImgFit={"orientation"}
                                    // style={{ width: "100%", height: "30vw" }}
                                    style={{ width: "100%", height: "27.5vw", borderRadius: "0.5vw" }}
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
                                    label="História"
                                    name="story"
                                    value={values.story}
                                    onChange={handleChange}
                                    multiline
                                    minRows={9}
                                />
                            </Box>
                        </Box>
                    </Form>
                )}
            </Formik>
        </Paper>
    )
}
