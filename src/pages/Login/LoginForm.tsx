import { Button } from "@mui/material"
import { Formik, Form } from "formik"
import React from "react"
import { TextField } from "../../components/TextField"

interface LoginFormProps {
    onSwitch: () => void
}

interface formValues {
    login: string
    password: string
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSwitch }) => {
    const initialValues: formValues = { login: "", password: "" }
    const handleSubmit = (values: formValues) => {
        console.log(values)
    }

    return (
        <div className="LoginForm-Component">
            <h1>Login</h1>
            <p>Por favor, faça o login para continuar</p>

            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                {({ values, handleChange }) => (
                    <Form>
                        <TextField
                            name="login"
                            placeholder="E-mail"
                            value={values.login}
                            onChange={handleChange}
                            fullWidth
                        />
                        <TextField
                            name="password"
                            placeholder="Senha"
                            value={values.password}
                            onChange={handleChange}
                            fullWidth
                        />
                        <Button type="submit" variant="contained">
                            Entrar
                        </Button>
                    </Form>
                )}
            </Formik>

            <div className="signup-text">
                <p>Não tem conta?</p>
                <p className="link" onClick={() => onSwitch()}>
                    Cadastre-se
                </p>
            </div>
        </div>
    )
}
