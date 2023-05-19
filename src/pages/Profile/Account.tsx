import { Form, Formik } from "formik"
import React, { useState } from "react"
import MaskedInput from "react-text-mask"
import { Button } from "../../components/Button"
import { TextField } from "../../components/TextField"
import { User } from "../../definitions/user"
import { useApi } from "../../hooks/useApi"
import { useColors } from "../../hooks/useColors"
import { useUser } from "../../hooks/useUser"
import { styles } from "./styles"
import { CircularProgress } from "@mui/material"
import { useSnackbar } from "../../hooks/useSnackbar"
import { useNavigate } from "react-router-dom"
import { QRCode } from "react-qrcode-logo"

interface AccountProps {
    user: User
}

interface FormValues extends User {}

export const Account: React.FC<AccountProps> = ({ user }) => {
    const vw = window.innerWidth / 100
    const api = useApi()
    const navigate = useNavigate()
    const { snackbar } = useSnackbar()
    const { setUser } = useUser()

    const [loading, setLoading] = useState(false)
    const [currentPasswordError, setCurrentPasswordError] = useState("")
    const [newPasswordError, setNewPasswordError] = useState("")

    const initialValues: FormValues = user

    const resetErrors = () => {
        setCurrentPasswordError("")
        setNewPasswordError("")
    }

    const handleSubmit = (values: FormValues) => {
        setLoading(true)
        resetErrors()

        api.user.update({
            data: { ...values, change_password: false },
            callback: (response: { data: User }) => {
                setUser(response.data)
                snackbar({
                    severity: "success",
                    text: "Usuário atualizado",
                })
                navigate("/cart")
            },
            finallyCallback: () => setLoading(false),
        })
    }

    return (
        <div className="Account-Component">
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                {({ values, handleChange }) => (
                    <Form>
                        <div className="account-details-upper-container">
                            <h2>Detalhes da conta</h2>
                            <TextField
                                name="name"
                                placeholder="Nome"
                                required
                                value={values.name}
                                onChange={handleChange}
                                InputLabelProps={{ sx: styles.textfield }}
                            />
                            <TextField
                                name="email"
                                placeholder="E-mail"
                                required
                                value={values.email}
                                onChange={handleChange}
                                InputLabelProps={{ sx: styles.textfield }}
                            />
                            <MaskedInput
                                mask={["(", /\d/, /\d/, ")", " ", /\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/]}
                                guide={false}
                                name="phone"
                                value={values.phone}
                                onChange={handleChange}
                                required
                                render={(ref, props) => (
                                    <TextField
                                        inputRef={ref}
                                        {...props}
                                        placeholder="Telefone"
                                        InputLabelProps={{ sx: styles.textfield }}
                                    />
                                )}
                            />
                        </div>

                        <div className="qrcode-container">
                            <QRCode value={"https://mira.agenciaboz.com.br"} size={20 * vw} />
                            <div className="text">
                                <h1>Baixe nosso aplicativo</h1>
                                <p>
                                    Utilize um leitor de QR Code de outro dispositivo e baixe nosso aplicativo para utilizar
                                    no seu próprio dispositivo.
                                </p>
                            </div>
                        </div>

                        <div className="avatar-security-container">
                            <img src="/mira_text_tablet.png" alt="Mira" />
                            <p className="avatar-security-text">Olá! Mira aqui.<br />Essa área é dedicada a edição de detalhes da conta, como esse dispositivo é de uso comum, essas funções estão boqueadas. Mas você pode baixar nosso aplicativo no seu próprio dispositivo utilizando o QR code acima.</p>
                        </div>

                        <Button type="submit">
                            {loading ? (
                                <CircularProgress sx={{ color: "white" }} style={{ width: "6vw", height: "auto" }} />
                            ) : (
                                "Salvar"
                            )}
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
