import React, { useEffect, useRef, useState } from "react"
import { Address as AddressType, User } from "../../definitions/user"
import { Form, Formik, useFormikContext } from "formik"
import { TextField } from "../../components/TextField"
import { Button } from "../../components/Button"
import MaskedInput from "react-text-mask"
import { useNumberMask } from "../../hooks/useNumberMask"
import { useEstadosBrasil } from "../../hooks/useEstadosBrasil"
import { MenuItem, CircularProgress } from "@mui/material"
import { useApi } from "../../hooks/useApi"
import { useUser } from "../../hooks/useUser"
import { useLocalStorage } from "../../hooks/useLocalStorage"
import { useNavigate } from "react-router-dom"
import { useSnackbar } from "../../hooks/useSnackbar"
import { Masked } from "../../definitions/masked_input"
import { AddressField } from "../../components/AddressField"

interface AddressProps {
    user: User
}

export interface FormikAdressValues extends AddressType {}

export const Address: React.FC<AddressProps> = ({ user }) => {
    const api = useApi()
    const navigate = useNavigate()
    const { snackbar } = useSnackbar()
    const { setUser } = useUser()
    const cepRef = useRef<Masked>(null)
    // const { setFieldValue } = useFormikContext()

    const [loading, setLoading] = useState(false)

    const initialValues: FormikAdressValues = user.addresses[0] || {
        receiver: "",
        phone: "",
        cep: "",
        address: "",
        number: 0,
        complement: "",
        district: "",
        city: "",
        uf: "",
    }

    const handleSubmit = (values: FormikAdressValues) => {
        if (loading) return

        setLoading(true)
        const data = {
            ...values,
            new_address: !user.addresses[0]?.id,
            user_id: user.id,
        }
        console.log(data)

        api.user.address({
            data: data,
            callback: (response: { data: AddressType }) => {
                const updatedUser = { ...user, addresses: [response.data] }
                setUser(updatedUser)
                navigate("/cart")
                snackbar({
                    severity: "success",
                    text: "Endereço salvo",
                })
            },
            finallyCallback: () => setLoading(false),
        })
    }

    return (
        <div className="Address-Component">
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                {({ values, handleChange }) => {
                    return (
                        <Form>
                            <h2>Endereço de entrega</h2>
                            <TextField
                                placeholder="Nome do destinatário"
                                name="receiver"
                                value={values.receiver}
                                onChange={handleChange}
                            />
                            <MaskedInput
                                mask={["(", /\d/, /\d/, ")", " ", /\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/]}
                                guide={false}
                                name="phone"
                                value={values.phone}
                                onChange={handleChange}
                                render={(ref, props) => (
                                    <TextField
                                        inputRef={ref}
                                        {...props}
                                        placeholder="Telefone"
                                        InputProps={{ inputMode: "numeric" }}
                                    />
                                )}
                            />
                            <AddressField values={values} handleChange={handleChange} />

                            <div className="buttons-container">
                                <Button
                                    onClick={() => navigate("/cart")}
                                    style={{
                                        height: "10vw",
                                        width: "35vw",
                                        background: "linear-gradient(90deg, #9F9F9F 0%, #565656 91.94%)",
                                    }}
                                >
                                    Cancelar
                                </Button>
                                <Button type="submit" style={{ height: "10vw", width: "35vw", marginRight: "1vw" }}>
                                    {loading ? (
                                        <CircularProgress sx={{ color: "white" }} style={{ width: "6vw", height: "auto" }} />
                                    ) : (
                                        "Salvar"
                                    )}
                                </Button>
                            </div>
                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
}
