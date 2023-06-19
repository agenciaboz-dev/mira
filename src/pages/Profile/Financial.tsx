import React, { useEffect, useState } from "react"
import { Card as CardType, User } from "../../definitions/user"
import { Form, Formik } from "formik"
import { Card } from "../../components/Card"
import { CircularProgress, FormControlLabel, Radio, RadioGroup } from "@mui/material"
import { Button } from "../../components/Button"
import { useColors } from "../../hooks/useColors"
import { TextField } from "../../components/TextField"
import MaskedInput from "react-text-mask"
import { useCardNumberMask } from "../../hooks/useCardNumberMask"
import { useNumberMask } from "../../hooks/useNumberMask"
import { useApi } from "../../hooks/useApi"
import { useNavigate } from "react-router-dom"
import { useSnackbar } from "../../hooks/useSnackbar"
import { useUser } from "../../hooks/useUser"
import { useLocalStorage } from "../../hooks/useLocalStorage"

interface FinancialProps {
    user: User
}

export const Financial: React.FC<FinancialProps> = ({ user }) => {
    const colors = useColors()
    const cardNumberMask = useCardNumberMask()
    const numberMask = useNumberMask(2, true)
    const threeNumberMask = useNumberMask(3)
    const fourNumberMask = useNumberMask(4, false, "")
    const api = useApi()
    const navigate = useNavigate()
    const { snackbar } = useSnackbar()
    const { setUser } = useUser()

    const [loading, setLoading] = useState(false)
    const [cardNumberError, setCardNumberError] = useState("")
    const [expiryDateError, setExpiryDateError] = useState("")
    
    const initialValues = {
        ...user.cards[0],
        expiry: `${user.cards[0].expiration_month}/${user.cards[0].expiration_year}`,
    } || {
        id: 0,
        number: "",
        name: "",
        expiry: "",
        cvv: "",
        type: "",
    }
    // const [expMonth, setExpMonth] = useState(Number(initialValues.expiration_month))
    // const [expYear, setExpYear] = useState(Number(initialValues.expiration_year))

    const radio_style = {
        "&.Mui-checked": {
            color: "#9AF82E",
            backgroundColor: colors.purple,
        },
        color: "#EBEBEB",
        backgroundColor: "white",
        padding: 0,
        boxShadow: "2px 3px 0px #1A7FB7",
        borderRadius: "50%",
        marginRight: "2vw",
    }

    const handleCardNumberBlur: React.FocusEventHandler<HTMLInputElement> = (event) => {
        if (event.target.value.length < 19) {
            setCardNumberError("Número de cartão inválido")
        } else {
            setCardNumberError("")
        }
    }

    
    const handleSubmit = (values: CardType) => {

        if (!values.type) return
        if (!!cardNumberError) return
        if (!validateExpiry(values)) return
        if (loading) return

        const expiry = values.expiry.split('/')
        
        const data = { ...values, user_id: user.id, new_card: !user.cards[0]?.id, expiration_month: expiry[0], expiration_year: expiry[1] }

        setLoading(true)
        api.user.card({
            data,
            callback: (response: { data: CardType }) => {
                const updatedUser = { ...user, cards: [response.data] }
                setUser(updatedUser)
                navigate("/cart")
                snackbar({
                    severity: "success",
                    text: "Cartão salvo",
                })
            },
            finallyCallback: () => setLoading(false),
        })
    }

    const validateExpiry = (values:CardType) => {
        const currentYear = new Date().getFullYear();

        const [month, year] = values.expiry.split('/')
        

        if ( values.expiry.length == 7 ) {
            if ( Number(month) < 1 || Number(month) > 12 ){
                alert("Mês inválido")
                return
            }
            if ( Number(year) < currentYear || Number(year) > currentYear + 50 ){
                alert("Ano inválido")
                return
            }
        } else {
            alert("Data inválida")
            return
        }

        return true
    }

    const handleExpiryBlur = (values:CardType) => {
        if (!validateExpiry(values)) {
            setExpiryDateError('Data inválida')
        }
    }

    return (
        <div className="Financial-Component">
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                {({ values, handleChange }) => (
                    <Form>
                        <h2>Financeiro</h2>
                        <Card card={values} />

                        <div className="type-container">
                            <RadioGroup
                                // defaultValue="debit"
                                value={values.type}
                                name="type"
                                onChange={handleChange}
                                sx={{ flexDirection: "row", gap: "15vw" }}
                            >
                                <FormControlLabel
                                    value="credit"
                                    sx={{ marginLeft: "0" }}
                                    control={<Radio sx={radio_style} />}
                                    label="Crédito"
                                />
                                <FormControlLabel
                                    value="debit"
                                    sx={{ marginLeft: "0" }}
                                    control={<Radio sx={radio_style} />}
                                    label="Débito"
                                />
                            </RadioGroup>
                        </div>

                        <div className="financial-input-container">
                            <label htmlFor="number">Número do cartão</label>
                            <MaskedInput
                                mask={cardNumberMask}
                                guide={false}
                                id="number"
                                name="number"
                                value={values.number}
                                onChange={handleChange}
                                onBlur={handleCardNumberBlur}
                                render={(ref, props) => (
                                    <TextField
                                        inputRef={ref}
                                        {...props}
                                        placeholder="Número do cartão"
                                        error={!!cardNumberError}
                                        helperText={cardNumberError}
                                        inputProps={{ inputMode: "numeric" }}
                                    />
                                )}
                            />
                        </div>

                        <div className="financial-input-container">
                            <label htmlFor="name">Nome registrado no cartão</label>
                            <TextField
                                placeholder="Nome registrado no cartão"
                                id="name"
                                name="name"
                                value={values.name}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="financial-two-inputs-row">
                            <div className="financial-input-container">
                                <label htmlFor="expiry">Data de expiração</label>
                                <MaskedInput
                                    onBlur={() => handleExpiryBlur(values)}
                                    mask={[/\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/]}
                                    guide={false}
                                    id="expiry"
                                    name="expiry"
                                    value={values.expiry}
                                    onChange={handleChange}
                                    render={(ref, props) => (
                                        <TextField
                                            inputRef={ref}
                                            {...props}
                                            placeholder="Expiração"
                                            error={!!expiryDateError}
                                            helperText={expiryDateError}
                                            inputProps={{ inputMode: "numeric" }}
                                        />
                                    )}
                                />
                                {/* <MaskedInput
                                    mask={numberMask}
                                    guide={false}
                                    name="expiration_month"
                                    value={values.expiration_month}
                                    onChange={handleChange}
                                    render={(ref, props) => <TextField inputRef={ref} {...props} placeholder="Mês" />}
                                /> */}
                                {/* <MaskedInput
                                    mask={fourNumberMask}
                                    guide={false}
                                    name="expiration_year"
                                    value={values.expiration_year}
                                    onChange={handleChange}
                                    render={(ref, props) => <TextField inputRef={ref} {...props} placeholder="Ano" />}
                                /> */}
                            </div>
                            <div className="financial-input-container">
                                <label htmlFor="cvv">Código de Segurança</label>
                                <MaskedInput
                                    mask={threeNumberMask}
                                    guide={false}
                                    id="cvv"
                                    name="cvv"
                                    value={values.cvv}
                                    onChange={handleChange}
                                    render={(ref, props) => (
                                        <TextField
                                            inputRef={ref}
                                            {...props}
                                            placeholder="CVV"
                                            inputProps={{ inputMode: "numeric" }}
                                        />
                                    )}
                                />
                            </div>
                        </div>

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
                                {loading ? (
                                    <CircularProgress sx={{ color: "white" }} style={{ width: "5vw", height: "auto" }} />
                                ) : (
                                    "Salvar"
                                )}
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
