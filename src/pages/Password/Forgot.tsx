import React, { useState } from "react"
import { Box, CircularProgress } from "@mui/material"
import { useColors } from "../../hooks/useColors"
import { TextField } from "../../components/TextField"
import { Form, Formik } from "formik"
import { Button } from "../../components/Button"
import { useApi } from "../../hooks/useApi"
import { User } from "../../definitions/user"

interface ForgotProps {}

export const Forgot: React.FC<ForgotProps> = ({}) => {
    const colors = useColors()
    const api = useApi()

    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState("")

    const handleSubmit = (values: { user: string }) => {
        if (loading) return

        setLoading(true)
        setResult("")
        api.user.recoverPassword({
            data: values,
            callback: (response: { data?: User }) => {
                setResult(response.data ? "Por favor, siga as instruções enviadas por e-mail" : "Nenhuma conta encontrada")
            },
            finallyCallback: () => setLoading(false),
        })
    }

    return (
        <Box sx={{ flexDirection: "column", backgroundColor: colors.purple, width: "100%", padding: "10vw", color: "white", gap: "5vw" }}>
            <h3 style={{ alignSelf: "center" }}>Esqueci minha senha</h3>
            <p>
                Digite o e-mail, nome de usuário ou cpf da sua conta. Caso exista, enviaremos um link para o e-mail associado a conta contendo as
                instruções para atualização da senha.
            </p>
            <Formik initialValues={{ user: "" }} onSubmit={handleSubmit}>
                {({ values, handleChange }) => (
                    <Form style={{ display: "contents" }}>
                        <TextField placeholder="E-mail, CPF ou nome de usuário" value={values.user} onChange={handleChange} name="user" required />
                        <Button type="submit">{loading ? <CircularProgress size="1.5rem" sx={{ color: "white" }} /> : "Enviar"}</Button>
                    </Form>
                )}
            </Formik>
            <p>{result}</p>
        </Box>
    )
}
