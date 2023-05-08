import { Button } from "@mui/material"
import { Formik, Form } from "formik"
import React from "react"
import { useNavigate } from "react-router-dom"
import { TextField } from "../../components/TextField"
import { User } from "../../definitions/user"
import { useApi } from "../../hooks/useApi"
import { useUser } from "../../hooks/useUser"

interface LoginFormProps {
    onSwitch: () => void
}

interface formValues {
    user: string
    password: string
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSwitch }) => {
    const initialValues: formValues = { user: "", password: "" }
    const api = useApi()
    const { setUser } = useUser()
    const navigate = useNavigate()

    const handleSubmit = (values: formValues) => {
        console.log(values)
        api.login({
            data: values,
            callback: (response: { data: User }) => {
                const user = response.data
                if (user) {
                    setUser(user)
                }
            },
        })
    }

    return (
        <div className="LoginForm-Component">
            <h1>Login</h1>
            <p>Por favor, faça o login para continuar</p>

            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                {({ values, handleChange }) => (
                    <Form>
                        <TextField name="user" placeholder="E-mail" value={values.user} onChange={handleChange} fullWidth />
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
