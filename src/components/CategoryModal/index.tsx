import { Dialog, CircularProgress, DialogContent, DialogTitle, Button, Box } from "@mui/material"
import React, { useRef, useState, useEffect } from "react"
import { useCategories } from "../../hooks/useCategories"
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation"
import IconButton from "@mui/material/IconButton"
import { styles } from "./styles"
import { Form, Formik } from "formik"
import TextField from "@mui/material/TextField/TextField"
import MaskedInput from "react-text-mask"
import { useNumberMask, useCurrencyMask } from "burgos-masks"
import { useApi } from "../../hooks/useApi"
import { useCurrentCategory } from "../../hooks/useCurrentCategory"
import { useSnackbar } from "burgos-snackbar"
import { Avatar, ExtFile, FileInputButton } from "@files-ui/react"
import colors from "../../colors"

interface CategoryModalProps {}

export const CategoryModal: React.FC<CategoryModalProps> = ({}) => {
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [files, setFiles] = useState<ExtFile[]>([])

    const currencyMask = useCurrencyMask()
    const numberMask = useNumberMask({})
    const volumeMask = useNumberMask({ allowDecimal: true })
    const api = useApi()
    const { refresh } = useCategories()
    const { currentCategory, setCurrentCategory, open, setOpen } = useCurrentCategory()
    const { snackbar } = useSnackbar()

    const initialValues: Category = currentCategory || { id: 0, image: "", name: "" }

    const handleSubmit = (values: Category) => {
        if (loading) return
        if (files.length == 0 && !values.image) {
            console.log(values.image)
            snackbar({ severity: "warning", text: "Envie uma imagem" })
            return
        }

        setLoading(true)

        const formData = new FormData()
        console.log(files)
        if (files.length > 0) formData.append("file", files[0].file!)
        formData.append("data", JSON.stringify(values))

        if (currentCategory) {
            api.categories.update({
                data: formData,
                callback: (response: { data: Category }) => {
                    console.log(response.data)
                    setOpen(false)
                    refresh()
                    snackbar({ severity: "success", text: "Categoria atualizada" })
                },
                finallyCallback: () => setLoading(false),
            })
        } else {
            api.categories.add({
                data: formData,
                callback: (response: { data: Category }) => {
                    setOpen(false)
                    refresh()
                    snackbar({ severity: "success", text: "Categoria adicionada" })
                },
                finallyCallback: () => setLoading(false),
            })
        }
    }

    const handleClose = () => {
        setOpen(false)
        setCurrentCategory(null)
    }

    return (
        <Dialog open={open} onClose={handleClose} sx={styles.dialog}>
            <DialogTitle sx={styles.title}>
                <IconButton onClick={handleClose} sx={{ position: "absolute", left: "1vw" }}>
                    <CancelPresentationIcon color="error" sx={styles.close_icon} />
                </IconButton>
                {currentCategory?.name || "Nova categoria"}
            </DialogTitle>

            <DialogContent sx={styles.content_container}>
                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                    {({ values, handleChange }) => (
                        <Form>
                            <TextField required label="Nome" name="name" value={values.name} onChange={handleChange} />
                            <Box sx={{ gap: "1vw" }}>
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
                            {files.map((file: ExtFile) => (
                                <Avatar
                                    key={file.id}
                                    src={file.file}
                                    readOnly
                                    smartImgFit={"orientation"}
                                    // style={{ width: "100%", height: "30vw" }}
                                    style={{ alignSelf: "center" }}
                                />
                            ))}
                            {currentCategory ? (
                                <Button type="submit" variant="contained" fullWidth>
                                    {loading ? (
                                        <CircularProgress
                                            style={{ width: "1.5rem", height: "auto" }}
                                            sx={{ color: "white" }}
                                        />
                                    ) : (
                                        `Atualizar ${currentCategory.name}`
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
