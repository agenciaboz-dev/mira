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
import { CircularProgress, Button as ButtonMui } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useConfirmDialog } from "burgos-confirm"
import { useSnackbar } from "burgos-snackbar"

interface AccountProps {
    user: User
}

interface FormValues extends User {
    new_password: string
    confirm_password: string
}

export const Account: React.FC<AccountProps> = ({ user }) => {
    const api = useApi()
    const navigate = useNavigate()
    const { snackbar } = useSnackbar()
    const { confirm } = useConfirmDialog()
    const { setUser, logout } = useUser()

    const [loading, setLoading] = useState(false)
    const [currentPasswordError, setCurrentPasswordError] = useState("")
    const [newPasswordError, setNewPasswordError] = useState("")

    const initialValues: FormValues = {
        ...user,
        password: "",
        new_password: "",
        confirm_password: "",
    }

    const resetErrors = () => {
        setCurrentPasswordError("")
        setNewPasswordError("")
    }

    const handleDeleteAccount = () => {
        confirm({
            title: "Certeza",
            content: "Tem certeza que deseja deletar sua conta?",
            onConfirm: () => {
                api.user.delete({
                    data: user,
                    callback: (response: { data: User }) => {
                        logout()
                        snackbar({ severity: "warning", text: "Usuário deletado" })
                    },
                })
            },
        })
    }

    const handleSubmit = (values: FormValues) => {
        setLoading(true)
        resetErrors()
        console.log(values)
        let change_password = false

        if (values.password && values.new_password && values.confirm_password) {
            if (values.password == user.password) {
                if (values.new_password == values.confirm_password) {
                    change_password = true
                } else {
                    setNewPasswordError("Senhas não conferem")
                }
            } else {
                setCurrentPasswordError("Senha atual inválida")
            }
        }

        api.user.update({
            data: { ...values, change_password },
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
                                    inputProps={{ inputMode: "numeric" }}
                                />
                            )}
                        />

                        <div className="pwd-alter-title">
                            <h2>Alteração de senha</h2>
                            <p>(deixe em branco para não alterar)</p>
                        </div>
                        <TextField
                            name="password"
                            placeholder="Senha atual"
                            value={values.password}
                            onChange={handleChange}
                            InputLabelProps={{ sx: styles.textfield }}
                            type="password"
                            error={!!currentPasswordError}
                            helperText={currentPasswordError}
                        />
                        <TextField
                            name="new_password"
                            placeholder="Nova senha"
                            value={values.new_password}
                            onChange={handleChange}
                            InputLabelProps={{ sx: styles.textfield }}
                            type="password"
                        />
                        <TextField
                            name="confirm_password"
                            placeholder="Confirmar senha"
                            value={values.confirm_password}
                            onChange={handleChange}
                            InputLabelProps={{ sx: styles.textfield }}
                            type="password"
                            error={!!newPasswordError}
                            helperText={newPasswordError}
                        />

                        <ButtonMui
                            onClick={handleDeleteAccount}
                            sx={{
                                paddingTop: "3vw",
                                textShadow: "red",
                                alignSelf: "flex-end",
                                color: "white",
                            }}
                        >
                            <p style={{ textDecoration: "underline" }}>Excluir Conta</p>
                        </ButtonMui>

                        <div className="buttons-container">
                            <Button
                                onClick={() => navigate("/cart")}
                                style={{
                                    height: "10vw",
                                    width: "35vw",
                                    background: "linear-gradient(90deg, #9F9F9F 0%, #565656 91.94%)",
                                }}
                            >
                                Cancelar
                            </Button>
                            <Button type="submit" style={{ height: "10vw", width: "35vw", marginRight: "1vw" }}>
                                {loading ? <CircularProgress sx={{ color: "white" }} style={{ width: "6vw", height: "auto" }} /> : "Salvar"}
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
