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
import { useSnackbar } from "burgos-snackbar"
import { useAddress } from "../../hooks/useAddress"
import { AddressField } from "../../components/AddressField"
import { useOrder } from "../../hooks/useOrder"
import { useCart } from "../../hooks/useCart"

interface AddressProps {}

export const Address: React.FC<AddressProps> = ({}) => {
    const numberMask = useNumberMask()
    const estados = useEstadosBrasil()
    const navigate = useNavigate()
    const { address, setAddress } = useAddress()
    const { setOrder } = useOrder()

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
        navigate("/checkout/payment")
        setTimeout(() => setAddress(values), 500)
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
                            render={(ref, props) => <TextField inputRef={ref} {...props} placeholder="Telefone" />}
                        />
                        <AddressField values={values} handleChange={handleChange} />

                        <div className="avatar-security-container">
                            <img src="/mira_text_totem.png" alt="Mira" />
                            <p className="avatar-security-text">Olá novamente! Mira aqui.<br />Levamos muito a sério a sua segurança, então, como sabemos que esse dispositivo é de uso comum, nenhuma das informações inseridas aqui será salva, fique tranquilo!</p>
                        </div>

                        <Button type="submit">
                            {loading ? (
                                <CircularProgress sx={{ color: "white" }} style={{ width: "5vw", height: "auto" }} />
                            ) : (
                                "Forma de Pagamento"
                            )}
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
