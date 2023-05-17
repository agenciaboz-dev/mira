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

interface AddressProps {}

export const Address: React.FC<AddressProps> = ({}) => {
    const numberMask = useNumberMask()
    const estados = useEstadosBrasil()
    const navigate = useNavigate()
    const { address, setAddress } = useAddress()
    const colors = useColors()

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

    const input_style = { border: `2px solid ${colors.blue}` }

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
                        <MaskedInput
                            mask={[/\d/, /\d/, ".", /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/]}
                            guide={false}
                            name="cep"
                            value={values.cep}
                            onChange={handleChange}
                            render={(ref, props) => (
                                <TextField inputRef={ref} {...props} placeholder="CEP" InputProps={{ style: input_style }} />
                            )}
                        />
                        <TextField
                            placeholder="Endereço"
                            name="address"
                            value={values.address}
                            onChange={handleChange}
                            InputProps={{ style: input_style }}
                        />
                        <div className="two-inputs">
                            <MaskedInput
                                mask={numberMask}
                                guide={false}
                                name="number"
                                value={values.number.toString()}
                                onChange={handleChange}
                                render={(ref, props) => (
                                    <TextField
                                        inputRef={ref}
                                        {...props}
                                        className="small-input"
                                        placeholder="Número"
                                        InputProps={{ style: input_style }}
                                    />
                                )}
                            />
                            <TextField
                                placeholder="Complemento"
                                name="complement"
                                value={values.complement}
                                onChange={handleChange}
                                sx={{ flex: "0.8" }}
                                InputProps={{ style: input_style }}
                            />
                        </div>
                        <TextField
                            placeholder="Bairro"
                            name="district"
                            value={values.district}
                            onChange={handleChange}
                            InputProps={{ style: input_style }}
                        />
                        <div className="two-inputs">
                            <TextField
                                placeholder="Cidade"
                                name="city"
                                value={values.city}
                                onChange={handleChange}
                                sx={{ flex: "0.8" }}
                                InputProps={{ style: input_style }}
                            />
                            <TextField
                                select
                                name={"uf"}
                                placeholder={"UF"}
                                onChange={handleChange}
                                value={values.uf}
                                className="small-input"
                                InputProps={{ style: input_style }}
                            >
                                {estados.map((estado) => (
                                    <MenuItem key={estado.value} value={estado.value} style={{ width: "100%" }}>
                                        {estado.value}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </div>

                        <img src="/address.mirinha.png" alt="Mirinha Endereço" />

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
