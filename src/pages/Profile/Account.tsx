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
    const { setUser } = useUser()

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
                            label="Nome"
                            value={values.name}
                            onChange={handleChange}
                            InputLabelProps={{ sx: styles.textfield }}
                        />
                        <TextField
                            name="email"
                            label="E-mail"
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
                            render={(ref, props) => (
                                <TextField
                                    inputRef={ref}
                                    {...props}
                                    label="Telefone"
                                    InputLabelProps={{ sx: styles.textfield }}
                                />
                            )}
                        />

                        <h3>Alteração de senha</h3>
                        <p>(deixa em branco para não alterar)</p>
                        <TextField
                            name="password"
                            label="Senha atual"
                            value={values.password}
                            onChange={handleChange}
                            InputLabelProps={{ sx: styles.textfield }}
                            type="password"
                            error={!!currentPasswordError}
                            helperText={currentPasswordError}
                        />
                        <TextField
                            name="new_password"
                            label="Nova senha"
                            value={values.new_password}
                            onChange={handleChange}
                            InputLabelProps={{ sx: styles.textfield }}
                            type="password"
                        />
                        <TextField
                            name="confirm_password"
                            label="Confirmar senha"
                            value={values.confirm_password}
                            onChange={handleChange}
                            InputLabelProps={{ sx: styles.textfield }}
                            type="password"
                            error={!!newPasswordError}
                            helperText={newPasswordError}
                        />

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
