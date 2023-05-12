import React, { useState } from "react"
import { Address as AddressType, User } from "../../definitions/user"
import { Form, Formik } from "formik"
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

interface AddressProps {
    user: User
}

interface FormikValues extends AddressType {}

export const Address: React.FC<AddressProps> = ({ user }) => {
    const numberMask = useNumberMask()
    const estados = useEstadosBrasil()
    const api = useApi()
    const storage = useLocalStorage()
    const navigate = useNavigate()
    const { snackbar } = useSnackbar()

    const { setUser } = useUser()

    const [remember, setRemember] = useState(!!storage.get("mira.rememberme"))
    const [loading, setLoading] = useState(false)

    const initialValues: FormikValues = user.addresses[0] || {
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

    const handleSubmit = (values: FormikValues) => {
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

                if (remember) {
                    storage.set("mira.user", updatedUser)
                }
            },
            finallyCallback: () => setLoading(false),
        })
    }

    return (
        <div className="Address-Component">
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                {({ values, handleChange }) => (
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
                            render={(ref, props) => <TextField inputRef={ref} {...props} placeholder="Telefone" />}
                        />
                        <MaskedInput
                            mask={[/\d/, /\d/, ".", /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/]}
                            guide={false}
                            name="cep"
                            value={values.cep}
                            onChange={handleChange}
                            render={(ref, props) => <TextField inputRef={ref} {...props} placeholder="CEP" />}
                        />
                        <TextField placeholder="Endereço" name="address" value={values.address} onChange={handleChange} />
                        <div className="two-inputs">
                            <MaskedInput
                                mask={numberMask}
                                guide={false}
                                name="number"
                                value={values.number.toString()}
                                onChange={handleChange}
                                render={(ref, props) => (
                                    <TextField inputRef={ref} {...props} className="small-input" placeholder="Número" />
                                )}
                            />
                            <TextField
                                placeholder="Complemento"
                                name="complement"
                                value={values.complement}
                                onChange={handleChange}
                                sx={{ flex: "0.8" }}
                            />
                        </div>
                        <TextField placeholder="Bairro" name="district" value={values.district} onChange={handleChange} />
                        <div className="two-inputs">
                            <TextField
                                placeholder="Cidade"
                                name="city"
                                value={values.city}
                                onChange={handleChange}
                                sx={{ flex: "0.8" }}
                            />
                            <TextField
                                select
                                name={"uf"}
                                placeholder={"UF"}
                                onChange={handleChange}
                                value={values.uf}
                                className="small-input"
                            >
                                {estados.map((estado) => (
                                    <MenuItem key={estado.value} value={estado.value} style={{ width: "100%" }}>
                                        {estado.value}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </div>
                        <Button type="submit">
                            {loading ? (
                                <CircularProgress sx={{ color: "white" }} style={{ width: "5vw", height: "auto" }} />
                            ) : (
                                "Salvar"
                            )}
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
