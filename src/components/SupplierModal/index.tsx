import { Dialog, CircularProgress, DialogContent, DialogTitle, Button, Box } from "@mui/material"
import React, { useRef, useState, useEffect } from "react"
import { useSuppliers } from "../../hooks/useSuppliers"
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation"
import IconButton from "@mui/material/IconButton"
import { styles } from "./styles"
import { Form, Formik } from "formik"
import TextField from "@mui/material/TextField/TextField"
import MaskedInput from "react-text-mask"
import { useNumberMask, useCurrencyMask } from "burgos-masks"
import { useApi } from "../../hooks/useApi"
import { useCurrentSupplier } from "../../hooks/useCurrentSupplier"
import { useSnackbar } from "burgos-snackbar"

interface SupplierModalProps {}

export const SupplierModal: React.FC<SupplierModalProps> = ({}) => {
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    const currencyMask = useCurrencyMask()
    const numberMask = useNumberMask({})
    const volumeMask = useNumberMask({ allowDecimal: true })
    const api = useApi()
    const { refresh } = useSuppliers()
    const { currentSupplier, setCurrentSupplier, open, setOpen } = useCurrentSupplier()
    const { snackbar } = useSnackbar()

    const initialValues: Supplier = currentSupplier || { id: 0, name: "", contact: "", document: "", code: "" }

    const handleSubmit = (values: Supplier) => {
        setLoading(true)

        if (currentSupplier) {
            api.suppliers.update({
                data: values,
                callback: (response: { data: Supplier }) => {
                    console.log(response.data)
                    setOpen(false)
                    refresh()
                    snackbar({ severity: "success", text: "Produto atualizado" })
                },
                finallyCallback: () => setLoading(false),
            })
        } else {
            api.suppliers.add({
                data: values,
                callback: (response: { data: Supplier }) => {
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
        setCurrentSupplier(null)
    }

    return (
        <Dialog open={open} onClose={handleClose} sx={styles.dialog}>
            <DialogTitle sx={styles.title}>
                <IconButton onClick={handleClose} sx={{ position: "absolute", left: "1vw" }}>
                    <CancelPresentationIcon color="error" sx={styles.close_icon} />
                </IconButton>
                {currentSupplier?.name || "Novo produto"}
            </DialogTitle>

            <DialogContent sx={styles.content_container}>
                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                    {({ values, handleChange }) => (
                        <Form>
                            <TextField label="Nome" name="name" value={values.name} onChange={handleChange} />
                            <TextField label="Código" name="code" value={values.code} onChange={handleChange} />
                            <TextField label="Documento" name="document" value={values.document} onChange={handleChange} />
                            <TextField label="Contato" name="contact" value={values.contact} onChange={handleChange} />

                            {currentSupplier ? (
                                <Button type="submit" variant="contained" fullWidth>
                                    {loading ? (
                                        <CircularProgress
                                            style={{ width: "1.5rem", height: "auto" }}
                                            sx={{ color: "white" }}
                                        />
                                    ) : (
                                        `Atualizar ${currentSupplier.name}`
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
