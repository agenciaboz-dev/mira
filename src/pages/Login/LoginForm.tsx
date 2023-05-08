import { Checkbox, FormControlLabel, CircularProgress } from "@mui/material"
import { Formik, Form } from "formik"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../../components/Button"
import { TextField } from "../../components/TextField"
import { User } from "../../definitions/user"
import { useApi } from "../../hooks/useApi"
import { useColors } from "../../hooks/useColors"
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
    const colors = useColors()

    const [loading, setLoading] = useState(false)
    const [loginError, setLoginError] = useState("")

    const handleSubmit = (values: formValues) => {
        console.log(values)
        setLoading(true)
        setLoginError("")
        api.login({
            data: values,
            callback: (response: { data: User }) => {
                const user = response.data
                if (user) {
                    setUser(user)
                    navigate("/cart")
                } else {
                    setLoginError("Usuário ou senha inválidos")
                }
            },
            finallyCallback: () => setLoading(false),
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
                            type={"password"}
                        />
                        <div className="submit-container">
                            <FormControlLabel
                                sx={{ gap: "3vw", margin: "0", whiteSpace: "nowrap" }}
                                control={
                                    <Checkbox
                                        sx={{
                                            "&.Mui-checked": {
                                                color: "#9AF82E",
                                                backgroundColor: "#9AF82E",
                                            },
                                            color: "#EBEBEB",
                                            backgroundColor: "#EBEBEB",
                                            padding: 0,
                                            boxShadow: "3px 5px 0px #1A7FB7",
                                            borderRadius: "5px",
                                        }}
                                        defaultChecked
                                    />
                                }
                                label="Matenha-me conectado"
                            />
                            <Button type="submit" variant="contained" style={{ width: "30vw" }}>
                                {loading ? (
                                    <CircularProgress sx={{ color: "white" }} style={{ width: "5vw", height: "auto" }} />
                                ) : (
                                    "Login"
                                )}
                            </Button>
                        </div>
                        <h3 style={{ alignSelf: "center" }}>{loginError}</h3>
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
