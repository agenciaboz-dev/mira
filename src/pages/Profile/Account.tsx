import { Form, Formik } from "formik"
import React from "react"
import MaskedInput from "react-text-mask"
import { Button } from "../../components/Button"
import { TextField } from "../../components/TextField"
import { User } from "../../definitions/user"
import { useColors } from "../../hooks/useColors"
import { styles } from "./styles"

interface AccountProps {
    user: User
}

interface FormValues extends User {
    new_password: string
    confirm_password: string
}

export const Account: React.FC<AccountProps> = ({ user }) => {
    const colors = useColors()

    const initialValues: FormValues = {
        ...user,
        password: "",
        new_password: "",
        confirm_password: "",
    }

    const handleSubmit = (values: FormValues) => {
        console.log(values)
    }

    return (
        <div className="Account-Component">
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                {({ values, handleChange }) => (
                    <Form>
                        <h2>Detalhes da conta</h2>
                        <TextField
                            name="name"
                            label="Nome"
                            value={values.name}
                            onChange={handleChange}
                            InputLabelProps={{ sx: styles.textfield }}
                        />
                        <TextField
                            name="email"
                            label="E-mail"
                            value={values.email}
                            onChange={handleChange}
                            InputLabelProps={{ sx: styles.textfield }}
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
                                    label="Telefone"
                                    InputLabelProps={{ sx: styles.textfield }}
                                />
                            )}
                        />

                        <h3>Alteração de senha</h3>
                        <p>(deixa em branco para não alterar)</p>
                        <TextField
                            name="password"
                            label="Senha atual"
                            value={values.password}
                            onChange={handleChange}
                            InputLabelProps={{ sx: styles.textfield }}
                            type="password"
                        />
                        <TextField
                            name="new_password"
                            label="Nova senha"
                            value={values.new_password}
                            onChange={handleChange}
                            InputLabelProps={{ sx: styles.textfield }}
                            type="password"
                        />
                        <TextField
                            name="confirm_password"
                            label="Confirmar senha"
                            value={values.confirm_password}
                            onChange={handleChange}
                            InputLabelProps={{ sx: styles.textfield }}
                            type="password"
                        />

                        <Button type="submit">Salvar</Button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
