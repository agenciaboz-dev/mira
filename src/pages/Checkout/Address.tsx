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
import { AddressField } from "../../components/AddressField"

interface AddressProps {}

export const Address: React.FC<AddressProps> = ({}) => {
    const numberMask = useNumberMask()
    const estados = useEstadosBrasil()
    const navigate = useNavigate()
    const { address, setAddress } = useAddress()

    const [loading, setLoading] = useState(false)

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

    const handleSubmit = (values: AddressType) => {
        if (loading) return

        setAddress({ ...values, delivery: true })
        navigate("/checkout/payment")
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
                                />
                            )}
                        />
                        <AddressField values={values} handleChange={handleChange} />

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
