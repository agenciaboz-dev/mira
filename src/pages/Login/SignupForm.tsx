import { Checkbox, CircularProgress, FormControl, FormControlLabel, InputLabel, MenuItem } from "@mui/material"
import { Form, Formik } from "formik"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import MaskedInput from "react-text-mask"
import { Button } from "../../components/Button"
import { TextField } from "../../components/TextField"
import { User } from "../../definitions/user"
import { useApi } from "../../hooks/useApi"
import { ReactComponent as ArrowIcon } from "../../images/down_arrow.svg"
import { ReactComponent as Divider } from "../../images/pasta_de_dente_2.svg"
import { useCpfMask, usePhoneMask } from "burgos-masks"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import { usePronouns } from "../../hooks/usePronouns"

interface SignupFormProps {}

interface FormikValues {
    name: string
    email: string
    password: string
    confirm: string
    phone: string
    cpf: string
    pronoun: string
}

export const SignupForm: React.FC<SignupFormProps> = ({}) => {
    const navigate = useNavigate()
    const api = useApi()
    const cpfMask = useCpfMask()
    const phoneMask = usePhoneMask()

    const listPronouns = usePronouns()

    const [signupError, setSignupError] = useState("")
    const [loading, setLoading] = useState(false)

    const initialValues: FormikValues = {
        name: "",
        email: "",
        password: "",
        confirm: "",
        phone: "",
        cpf: "",
        pronoun: "select",
    }

    const handleSubmit = (values: FormikValues) => {
        console.log(values)
        setLoading(true)
        setSignupError("")

        api.signup({
            data: values,
            callback: (response: { data: User }) => {
                const user = response.data
                if (user) {
                    console.log(user)
                    navigate("/cart")
                } else {
                    setSignupError("E-mail já cadastrado")
                }
            },
            finallyCallback: () => setLoading(false),
        })
    }

    return (
        <div className="SignupForm-Component">
            {/* <Divider className="tp-signup-divider" style={{ position: "absolute", width: "100vw", left: 0, top: 0 }}/> */}
            <ArrowIcon className="signup-arrow-up" onClick={() => navigate("/login")} />

            <h1>Cadastro</h1>
            <p>Por favor, complete os campos abaixo para efetuar o cadastro</p>

            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                {({ values, handleChange }) => (
                    <Form>
                        <div style={{ width: "100%", gap: "1vw" }}>
                            <TextField
                                name="name"
                                placeholder="Nome"
                                value={values.name}
                                onChange={handleChange}
                                sx={{ width: "100%" }}
                                size="small"
                                required
                            />
                            <FormControl sx={{ width: "40%", backgroundColor: "white", borderRadius: "5vw" }}>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={values.pronoun}
                                    label=""
                                    onChange={handleChange}
                                    name="pronoun"
                                    required
                                >
                                    <MenuItem value="select" disabled>
                                        <em>Tratamento</em>
                                    </MenuItem>
                                    {listPronouns.map((pronouns) => (
                                        <MenuItem key={pronouns.value} value={pronouns.value}>
                                            {pronouns.label}
                                        </MenuItem>
                                    ))}
                                    <MenuItem value="Nenhuma">Nenhuma das opções</MenuItem>
                                </Select>
                            </FormControl>
                        </div>

                        <MaskedInput
                            mask={cpfMask}
                            guide={false}
                            name="cpf"
                            value={values.cpf}
                            onChange={handleChange}
                            render={(ref, props) => (
                                <TextField inputRef={ref} {...props} placeholder="CPF" fullWidth size="small" />
                            )}
                            required
                        />

                        <MaskedInput
                            mask={phoneMask}
                            guide={false}
                            name="phone"
                            value={values.phone}
                            onChange={handleChange}
                            render={(ref, props) => (
                                <TextField inputRef={ref} {...props} placeholder="Telefone" fullWidth size="small" />
                            )}
                            required
                        />

                        <TextField
                            name="email"
                            placeholder="E-mail"
                            value={values.email}
                            onChange={handleChange}
                            fullWidth
                            size="small"
                            required
                        />
                        <TextField
                            name="password"
                            placeholder="Senha"
                            value={values.password}
                            onChange={handleChange}
                            fullWidth
                            type={"password"}
                            size="small"
                            required
                        />
                        <TextField
                            name="confirm"
                            placeholder="Confirme a senha"
                            value={values.confirm}
                            onChange={handleChange}
                            fullWidth
                            type={"password"}
                            size="small"
                            required
                        />
                        <MaskedInput
                            mask={["(", /\d/, /\d/, ")", " ", /\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/]}
                            guide={false}
                            name="phone"
                            value={values.phone}
                            onChange={handleChange}
                            render={(ref, props) => (
                                <TextField inputRef={ref} {...props} placeholder="Telefone" fullWidth size="small" />
                            )}
                            required
                        />
                        <Button type="submit" variant="contained" style={{ fontSize: "3.5vw" }} fullWidth>
                            {loading ? (
                                <CircularProgress sx={{ color: "white" }} style={{ width: "10vw", height: "auto" }} />
                            ) : (
                                "Concluir Cadastro"
                            )}
                        </Button>
                        <h3 style={{ alignSelf: "center" }}>{signupError}</h3>
                    </Form>
                )}
            </Formik>

            <div className="background"></div>
        </div>
    )
}
