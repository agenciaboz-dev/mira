import React from "react"
import { Address as AddressType, User } from "../../definitions/user"
import { Form, Formik } from "formik"
import { TextField } from "../../components/TextField"
import { Button } from "../../components/Button"
import MaskedInput from "react-text-mask"
import { useNumberMask } from "../../hooks/useNumberMask"

interface AddressProps {
    user: User
}

interface FormikValues extends AddressType {}

export const Address: React.FC<AddressProps> = ({ user }) => {
    const numberMask = useNumberMask()

    const initialValues: FormikValues = user.address[0] || {
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
        console.log(values)
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
                                placeholder="UF"
                                name="uf"
                                className="small-input"
                                value={values.uf}
                                onChange={handleChange}
                            />
                        </div>
                        <Button type="submit">Salvar</Button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
