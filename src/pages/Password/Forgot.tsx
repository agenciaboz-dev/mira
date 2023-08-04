import React, { useState } from "react"
import { Box, CircularProgress } from "@mui/material"
import { useColors } from "../../hooks/useColors"
import { TextField } from "../../components/TextField"
import { Form, Formik } from "formik"
import { Button } from "../../components/Button"
import { useApi } from "../../hooks/useApi"
import { User } from "../../definitions/user"
import background from "../../images/bricks_webp.webp"
import { ReactComponent as Logo } from "../../images/logo.svg"
import { ReactComponent as Divider } from "../../images/pasta_de_dente.svg"
import { useNavigate } from "react-router-dom"

interface ForgotProps {}

export const Forgot: React.FC<ForgotProps> = ({}) => {
    const colors = useColors()
    const api = useApi()
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState("")

    const handleSubmit = (values: { user: string }) => {
        if (loading) return

        setLoading(true)
        setResult("")
        api.user.recoverPassword({
            data: values,
            callback: (response: { data?: User }) => {
                setResult(
                    response.data
                        ? "Por gentileza, siga as instruções enviadas por e-mail."
                        : "Nenhuma conta encontrada! Cadastre-se primeiro."
                )
            },
            finallyCallback: () => setLoading(false),
        })
    }

    return (
        <Box
            sx={{
                flexDirection: "column",
                backgroundImage: `url(${background})`,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                width: "100%",
                padding: "0vw",
                color: "white",
                gap: "5vw",
            }}
        >
            <div style={{ position: "relative", flexDirection: "column", alignItems: "center", height: "100%" }}>
                <Logo style={{ width: "50vw", height: "auto", flexShrink: 0, marginTop: "8vw" }} />
                <Divider style={{ position: "absolute", width: "100vw", top: "50vw", objectFit: "fill" }} />
            </div>
            <Box
                sx={{
                    flexDirection: "column",
                    backgroundColor: colors.purple,
                    height: "100%",
                    width: "100%",
                    padding: "7vw 7vw",
                    color: "white",
                }}
            >
                <Box
                    sx={{
                        flexDirection: "column",
                        height: "100%",
                        width: "100%",
                        color: "white",
                        gap: "5vw",
                        position: "relative",
                        bottom: "14vw",
                    }}
                >
                    <h2 style={{ alignSelf: "start" }}>Redefinir senha</h2>
                    <p style={{ fontSize: "2.9vw", textAlign: "justify" }}>
                        Para recuperar sua senha, informe seu endereço de e-mail, nome de usuário ou CPF. Enviaremos um link
                        para o e-mail cadastrado em sua conta.
                    </p>
                    <Formik initialValues={{ user: "" }} onSubmit={handleSubmit}>
                        {({ values, handleChange }) => (
                            <Form style={{ display: "contents" }}>
                                <TextField
                                    placeholder="E-mail, CPF ou nome de usuário"
                                    value={values.user}
                                    onChange={handleChange}
                                    name="user"
                                    sx={{ fontSize: "3vw", height: "12vw", padding: "2vw 1vw" }}
                                    required
                                />
                                <Box sx={{ width: "100%", gap: "3vw", paddingTop: "2vw" }}>
                                    <Button
                                        type="button"
                                        onClick={() => {
                                            navigate("/")
                                        }}
                                        sx={{ width: "50%" }}
                                    >
                                        Cancelar
                                    </Button>
                                    <Button type="submit" sx={{ width: "50%" }}>
                                        {loading ? <CircularProgress size="1.5rem" sx={{ color: "white" }} /> : "Enviar"}
                                    </Button>
                                </Box>
                            </Form>
                        )}
                    </Formik>
                    <p style={{ fontSize: "3.3vw" }}>{result}</p>
                </Box>
            </Box>
        </Box>
    )
}
