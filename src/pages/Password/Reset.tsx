import React, { useEffect, useState } from "react"
import { Box, CircularProgress, Skeleton, SxProps } from "@mui/material"
import { useNavigate, useParams } from "react-router-dom"
import { User } from "../../definitions/user"
import { useApi } from "../../hooks/useApi"
import { useColors } from "../../hooks/useColors"
import { Form, Formik } from "formik"
import { TextField } from "../../components/TextField"
import { Button } from "../../components/Button"
import background from "../../images/bricks_webp.webp"
import { ReactComponent as Logo } from "../../images/logo.svg"
import { ReactComponent as Divider } from "../../images/pasta_de_dente.svg"
import styled from "@emotion/styled"
import "./style.scss"

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
        borderRadius: "5vw",
        backgroundColor: colors.purple2,
        "@media (max-width: 768px)": {
            width: "100%",
            height: "12vw",
        },
        "@media (min-width: 768px)": {
            width: "100%",
            height: "3vw",
        },
    }
    const ResponsiveLogo = styled(Logo)`
        @media (max-width: 768px) {
            width: 50vw;
            height: auto;
            flex-shrink: 0;
            margin-top: 8vw;
        }
        @media (min-width: 768px) {
            width: 15vw;
            height: auto;
            flex-shrink: 0;
            margin-top: 2vw;
            position: absolute;
            right: 10vw;
        }
    `
    const ResponsiveDivider = styled(Divider)`
        @media (max-width: 768px) {
            position: absolute;
            width: 100vw;
            top: 50vw;
            objectfit: fill;
        }
        @media (min-width: 768px) {
            position: relative;
            width: 122vw;
            height: 15.5vw;
            right: 9vw;
            top: 9vw;
        }
    `

    const isMobile = window.matchMedia("(max-width: 768px)").matches
    const handleSubmit = (values: FormValues) => {
        if (loading) return
        if (!user) return

        setFeedback("")
        if (values.password != values.confirmPassword) {
            setFeedback("Senhas não conferem")
            return
        }

        if (!values.password) {
            setFeedback("Insira uma senha")
            return
        }

        setLoading(true)
        api.user.password({
            data: { id: user.id, password: values.password },
            callback: (response: { data: User }) => {
                setFeedback(
                    response.data
                        ? isMobile
                            ? "Senha alterada com sucesso, redirecionando para página de login!"
                            : "Agora é só entrar pelo nosso APP!"
                        : "Houve um erro ao tentar alterar a senha"
                )
                setTimeout(() => (isMobile ? navigate("/login") : feedback), 2000)
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
                } else {
                    setFeedback("Usuário não encontrado")
                }
            },
            finallyCallback: () => setUserLoading(false),
        })
    }, [])

    return (
        <Box
            sx={{
                "@media (max-width: 768px)": {
                    width: "100vw",
                    minHeight: "-webkit-fill-available",
                    overflow: "hidden",
                    flexDirection: "column",
                    backgroundImage: `url(${background})`,
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    color: "white",
                },
                "@media (min-width: 768px)": {
                    width: "100%",
                    height: "100%",
                    flexDirection: "column",
                    backgroundImage: `url(${background})`,
                },
            }}
        >
            <Box
                sx={{
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <ResponsiveLogo />
                <ResponsiveDivider />
            </Box>
            <Box
                sx={{
                    "@media (max-width: 768px)": {
                        flexDirection: "column",
                        backgroundColor: colors.purple,
                        height: "70%",
                        width: "100%",
                        padding: "0vw 7vw",
                        position: "relative",
                        top: "32vw",
                        color: "white",
                    },
                    "@media (min-width: 768px)": {
                        flexDirection: "column",
                        backgroundColor: colors.purple,
                        height: "51vh",
                        width: "100%",
                        padding: "0vw 7vw",
                        position: "relative",
                        top: "9.0vw",
                        color: "white",
                    },
                }}
            >
                <Box
                    sx={{
                        "@media (max-width:768px)": {
                            flexDirection: "column",
                            width: "100%",
                            height: "max-content",
                            color: "white",

                            gap: "5vw",
                            margin: "0",
                            position: "relative",
                            top: "2vw",
                        },
                        "@media (min-width:768px)": {
                            flexDirection: "column",
                            width: "100%",
                            height: "max-content",
                            color: "white",

                            gap: "5vw",
                            margin: "0",
                            position: "relative",
                            bottom: "1.5vw",
                        },
                    }}
                >
                    <Box
                        sx={{
                            flexDirection: "column",
                            height: "100%",
                            width: "100%",
                            color: "white",
                            gap: "8w",
                            //backgroundColor: "purple",
                        }}
                    >
                        <h2 className="styleHeader">Resetar senha</h2>
                        {userLoading ? (
                            <Box
                                sx={{
                                    "@media (max-width:768px)": { flexDirection: "column", gap: "5vw", paddingTop: "5vw" },
                                    "@media (min-width:768px)": {
                                        flexDirection: "column",
                                        gap: "2vw",
                                        marginLeft: "4vw",
                                        width: "40%",
                                    },
                                }}
                            >
                                <Skeleton variant="rounded" animation="wave" sx={skeletonStyle} />
                                <Skeleton variant="rounded" animation="wave" sx={skeletonStyle} />
                            </Box>
                        ) : user ? (
                            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                                {({ values, handleChange }) => (
                                    <Form style={{ display: "contents" }}>
                                        <Box
                                            sx={{
                                                "@media (max-width:768px)": { flexDirection: "column", gap: "6vw" },
                                                "@media (min-width:768px)": { flexDirection: "column", gap: "4vw" },
                                            }}
                                        >
                                            <Box sx={{ flexDirection: "column", gap: "2vw" }}>
                                                <TextField
                                                    placeholder="Nova senha"
                                                    name="password"
                                                    value={values.password}
                                                    onChange={handleChange}
                                                    type="password"
                                                    sx={{
                                                        "@media (max-width: 768px)": {
                                                            fontSize: "3vw",
                                                            height: "12vw",
                                                            padding: "2vw 1vw",
                                                        },
                                                        "@media (min-width: 768px)": {
                                                            fontSize: "1vw",
                                                            width: "60%",
                                                            marginLeft: "2vw",

                                                            "& .MuiOutlinedInput-input": {
                                                                height: "0vh",
                                                            },
                                                        },
                                                    }}
                                                    required
                                                />
                                                <TextField
                                                    placeholder="Confirme a senha"
                                                    name="confirmPassword"
                                                    value={values.confirmPassword}
                                                    onChange={handleChange}
                                                    type="password"
                                                    sx={{
                                                        "@media (max-width: 768px)": {
                                                            fontSize: "3vw",
                                                            height: "12vw",
                                                            padding: "2vw 1vw",
                                                        },
                                                        "@media (min-width: 768px)": {
                                                            fontSize: "1vw",
                                                            width: "60%",
                                                            marginLeft: "2vw",
                                                            "& .MuiOutlinedInput-input": {
                                                                height: "0vh",
                                                            },
                                                        },
                                                    }}
                                                    required
                                                />
                                            </Box>
                                            <Button
                                                type="submit"
                                                sx={{
                                                    "@media (min-width: 768px)": {
                                                        width: "20%",
                                                        height: "2.5vw",
                                                        fontSize: "1.2vw",
                                                        marginLeft: "17.5vw",
                                                    },
                                                }}
                                            >
                                                {loading ? (
                                                    isMobile ? (
                                                        <CircularProgress size="1.5rem" sx={{ color: "white" }} />
                                                    ) : (
                                                        <CircularProgress size="5rem" sx={{ color: "white" }} />
                                                    )
                                                ) : (
                                                    "Enviar"
                                                )}
                                            </Button>
                                        </Box>
                                    </Form>
                                )}
                            </Formik>
                        ) : (
                            <></>
                        )}
                        <p className="feedback">{feedback}</p>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
