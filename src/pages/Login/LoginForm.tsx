import { FormControlLabel, CircularProgress } from "@mui/material"
import { Formik, Form } from "formik"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../../components/Button"
import { TextField } from "../../components/TextField"
import { User } from "../../definitions/user"
import { useApi } from "../../hooks/useApi"
import { useColors } from "../../hooks/useColors"
import { useLocalStorage } from "../../hooks/useLocalStorage"
import { useUser } from "../../hooks/useUser"
import { ReactComponent as ArrowIcon } from "../../images/down_arrow.svg"
import { Checkbox } from "../../components/Checkbox"

interface LoginFormProps {}

interface formValues {
    user: string
    password: string
}

export const LoginForm: React.FC<LoginFormProps> = ({}) => {
    const initialValues: formValues = { user: "", password: "" }
    const api = useApi()
    const { setUser } = useUser()
    const navigate = useNavigate()
    const colors = useColors()
    const storage = useLocalStorage()

    const [loading, setLoading] = useState(false)
    const [loginError, setLoginError] = useState("")
    const [remember, setRemember] = useState(!!storage.get("mira.rememberme"))

    const handleSubmit = (values: formValues) => {
        console.log(values)
        setLoading(true)
        setLoginError("")
        api.login({
            data: values,
            callback: (response: { data: User }) => {
                const user = response.data
                if (user) {
                    console.log(user)
                    setUser(user)
                    navigate("/cart")

                    if (remember) {
                        storage.set("mira.user", user)
                    }
                } else {
                    setLoginError("Usuário ou senha inválidos")
                }
            },
            finallyCallback: () => setLoading(false),
        })
    }

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
        setRemember(checked)
        if (checked) {
            storage.set("mira.rememberme", true)
        } else {
            storage.set("mira.rememberme", false)
        }
    }

    useEffect(() => {
        const user = storage.get("mira.user")
        if (user) {
            setUser(user)
            navigate("/cart")
        }
    }, [])

    return (
        <div className="LoginForm-Component">
            <h1>Login</h1>
            <p>Por favor, faça o login para continuar</p>

            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                {({ values, handleChange }) => (
                    <Form>
                        <TextField
                            name="user"
                            placeholder="E-mail"
                            value={values.user}
                            onChange={handleChange}
                            fullWidth
                            size="small"
                        />

                        <TextField
                            name="password"
                            placeholder="Senha"
                            value={values.password}
                            onChange={handleChange}
                            fullWidth
                            type={"password"}
                            size="small"
                        />

                        <div className="forgot-password">Esqueceu a senha?</div>

                        <div className="submit-container">
                            <Checkbox checkboxStyle={{}} value={remember} handleChange={handleCheckboxChange} label="Mantenha-me conectado" />
                            <Button type="submit" variant="contained" style={{ width: "30vw", height: "7vw" , fontSize: "3.5vw" }}>
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
                <p>Não tem uma conta?</p>
                <p className="link" onClick={() => navigate("/login/signup")}>
                    Cadastre-se!
                    <ArrowIcon className="signup-arrow-down" />
                </p>
            </div>
        </div>
    )
}
