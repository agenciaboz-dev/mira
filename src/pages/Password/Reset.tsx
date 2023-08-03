import React, { useEffect, useState } from "react"
import { Box, CircularProgress, Skeleton, SxProps } from "@mui/material"
import { useNavigate, useParams } from "react-router-dom"
import { User } from "../../definitions/user"
import { useApi } from "../../hooks/useApi"
import { useColors } from "../../hooks/useColors"
import { Form, Formik } from "formik"
import { TextField } from "../../components/TextField"
import { Button } from "../../components/Button"

interface ResetProps {}

interface FormValues {
    password: string
    confirmPassword: string
}

export const Reset: React.FC<ResetProps> = ({}) => {
    const hash = useParams().hash
    const api = useApi()
    const colors = useColors()
    const navigate = useNavigate()

    const [userLoading, setUserLoading] = useState(true)

    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState<User>()
    const [feedback, setFeedback] = useState("")

    const initialValues: FormValues = {
        password: "",
        confirmPassword: "",
    }

    const skeletonStyle: SxProps = {
        width: "100%",
        height: "10vw",
        borderRadius: "5vw",
        backgroundColor: colors.purple2,
    }

    const handleSubmit = (values: FormValues) => {
        if (loading) return
        if (!user) return

        setFeedback("")
        if (values.password != values.confirmPassword) {
            setFeedback("Senhas não conferem")
            return
        }

        setLoading(true)
        api.user.password({
            data: { id: user.id, password: values.password },
            callback: (response: { data: User }) => {
                setFeedback(
                    response.data ? "Senha alterada com sucesso, redirecionando para página de login" : "Houve um erro ao tentar alterar a senha"
                )
                setTimeout(() => navigate("/login"), 2000)
            },
            finallyCallback: () => setLoading(false),
        })
    }

    useEffect(() => {
        api.user.hash({
            data: { hash },
            callback: (response: { data: User }) => {
                const user = response.data
                console.log(user)
                if (user) {
                    setUser(user)
                }
            },
            finallyCallback: () => setUserLoading(false),
        })
    }, [])

    return (
        <Box sx={{ flexDirection: "column", backgroundColor: colors.purple, width: "100%", padding: "10vw", color: "white", gap: "5vw" }}>
            <h3 style={{ alignSelf: "center" }}>Resetar senha</h3>

            {userLoading ? (
                <Box sx={{ flexDirection: "column", gap: "5vw" }}>
                    <Skeleton variant="rounded" animation="wave" sx={skeletonStyle} />
                    <Skeleton variant="rounded" animation="wave" sx={skeletonStyle} />
                </Box>
            ) : (
                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                    {({ values, handleChange }) => (
                        <Form style={{ display: "contents" }}>
                            <TextField
                                placeholder="Nova senha"
                                name="password"
                                value={values.password}
                                onChange={handleChange}
                                type="password"
                                required
                            />
                            <TextField
                                placeholder="Confirme a senha"
                                name="confirmPassword"
                                value={values.confirmPassword}
                                onChange={handleChange}
                                type="password"
                                required
                            />
                            <Button type="submit">{loading ? <CircularProgress size="1.5rem" sx={{ color: "white" }} /> : "Enviar"}</Button>
                        </Form>
                    )}
                </Formik>
            )}
            <p>{feedback}</p>
        </Box>
    )
}
