import { Form, Formik } from "formik"
import React, { useState } from "react"
import { TextField, Button, CircularProgress } from "@mui/material"
import { useApi } from "../../hooks/useApi"
import { useUser } from "../../hooks/useUser"
import { useNavigate } from "react-router-dom"
import { ReactComponent as LogoIcon } from "../../images/logo.svg"
import { useWebsocket } from "../../hooks/useWebsocket"

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
    const websocket = useWebsocket()

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
                    console.log(user)
                    setUser(user)
                    navigate("/dashboard/products")
                    websocket.send({ adm: user })
                } else {
                    setError("Usuário ou senha inválidos")
                }
            },
            finallyCallback: () => setLoading(false),
        })
    }
    return (
        <div className="Login-Component">
            <LogoIcon style={{ width: "30vw", height: "auto" }} />
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                {({ values, handleChange }) => (
                    <Form>
                        <TextField
                            variant="standard"
                            label="Usuário ou e-mail"
                            name="user"
                            value={values.user}
                            onChange={handleChange}
                        />
                        <TextField
                            variant="standard"
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
