import React, { useState } from "react"
import { useUser } from "../../hooks/useUser"
import { Address as AddressType } from "../../definitions/user"
import { Form, Formik } from "formik"
import { TextField } from "../../components/TextField"
import MaskedInput from "react-text-mask"
import { useNumberMask } from "../../hooks/useNumberMask"
import { useEstadosBrasil } from "../../hooks/useEstadosBrasil"
import { CircularProgress, MenuItem } from "@mui/material"
import { Button } from "../../components/Button"
import { Checkbox } from "../../components/Checkbox"
import { useNavigate } from "react-router-dom"
import { useApi } from "../../hooks/useApi"
import { useSnackbar } from "../../hooks/useSnackbar"
import { useAddress } from "../../hooks/useAddress"
import { useColors } from "../../hooks/useColors"
import { AddressField } from "../../components/AddressField"

interface AddressProps {}

export const Address: React.FC<AddressProps> = ({}) => {
    const { user, setUser } = useUser()
    const numberMask = useNumberMask()
    const estados = useEstadosBrasil()
    const navigate = useNavigate()
    const api = useApi()
    const { snackbar } = useSnackbar()
    const { address, setAddress } = useAddress()
    const colors = useColors()

    const [loading, setLoading] = useState(false)
    const [saveAddress, setSaveAddress] = useState(false)

    const initialValues: AddressType = address! || {
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

    const input_style = { border: `2px solid ${colors.blue}` }

    const handleSubmit = (values: AddressType) => {
        if (loading) return

        if (saveAddress) {
            setLoading(true)
            const data = {
                ...values,
                new_address: !user!.addresses[0]?.id,
                user_id: user!.id,
            }
            console.log(data)

            api.user.address({
                data: data,
                callback: (response: { data: AddressType }) => {
                    const updatedUser = { ...user!, addresses: [response.data] }
                    setUser(updatedUser)
                    navigate("/checkout/payment")
                    snackbar({
                        severity: "success",
                        text: "Endereço salvo",
                    })
                },
                finallyCallback: () => setLoading(false),
            })
        } else {
            setAddress({ ...values, delivery: true })
            navigate("/checkout/payment")
        }
    }

    return (
        <div className="Address-Component">
            <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize>
                {({ values, handleChange }) => (
                    <Form>
                        <h2>Endereço de entrega</h2>
                        <TextField
                            placeholder="Nome do destinatário"
                            name="receiver"
                            value={values.receiver}
                            onChange={handleChange}
                            InputProps={{ style: input_style }}
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
                                    InputProps={{ style: input_style }}
                                />
                            )}
                        />
                        <AddressField values={values} handleChange={handleChange} />
                        <Checkbox
                            label="Salve esse endereço para compras futuras"
                            value={saveAddress}
                            labelStyle={{ flexDirection: "row-reverse", whiteSpace: "break-spaces" }}
                            checkboxStyle={{ backgroundColor: "transparent" }}
                            handleChange={(_, checked) => setSaveAddress(checked)}
                        />

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