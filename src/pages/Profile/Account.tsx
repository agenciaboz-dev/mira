import { Form, Formik } from "formik"
import React from "react"
import { TextField } from "../../components/TextField"
import { User } from "../../definitions/user"
import { useColors } from "../../hooks/useColors"
import { styles } from "./styles"

interface AccountProps {
    user: User
}

interface FormValues {
    name: string
    email: string
    phone: string
}

export const Account: React.FC<AccountProps> = ({ user }) => {
    const colors = useColors()

    const initialValues: FormValues = user

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
                        <TextField
                            name="phone"
                            label="Telefone"
                            value={values.phone}
                            onChange={handleChange}
                            InputLabelProps={{ sx: styles.textfield }}
                        />
                    </Form>
                )}
            </Formik>
        </div>
    )
}
