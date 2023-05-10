import { Form, Formik } from "formik"
import React, { useState } from "react"
import { TextField, Button, CircularProgress } from "@mui/material"
import { useApi } from "../../hooks/useApi"
import { User } from "../../definitions/user"
import { useUser } from "../../hooks/useUser"
import { useNavigate } from "react-router-dom"

interface LoginProps {}

interface FormValues {
    user: string
    password: string
}

export const Login: React.FC<LoginProps> = ({}) => {
    const initialValues: FormValues = { user: "", password: "" }

    const api = useApi()
    const { setUser } = useUser()
    const navigate = useNavigate()

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = (values: FormValues) => {
        if (loading) return

        setError("")
        setLoading(true)
        api.adm.login({
            data: values,
            callback: (response: { data: User }) => {
                const user = response.data
                if (user) {
                    setUser(user)
                    navigate("dashboard")
                } else {
                    setError("Usuário ou senha inválidos")
                }
            },
            finallyCallback: () => setLoading(false),
        })
    }
    return (
        <div className="Login-Component">
            <h1>Controle de estoque</h1>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                {({ values, handleChange }) => (
                    <Form>
                        <TextField label="Usuário ou e-mail" name="user" value={values.user} onChange={handleChange} />
                        <TextField
                            label="Senha"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            type="password"
                        />
                        <Button type="submit" variant="contained">
                            {loading ? (
                                <CircularProgress style={{ width: "1.5rem", height: "auto" }} sx={{ color: "white" }} />
                            ) : (
                                "Entrar"
                            )}
                        </Button>
                        {!!error && (
                            <Button color="error" variant="text">
                                {error}
                            </Button>
                        )}
                    </Form>
                )}
            </Formik>
        </div>
    )
}
