import React, { useState } from "react"
import { Card, User } from "../definitions/user"
import { useColors } from "../hooks/useColors"
import { useApi } from "../hooks/useApi"
import { useUser } from "../hooks/useUser"
import { useNavigate } from "react-router-dom"
import { useSnackbar } from "../hooks/useSnackbar"
import { Form, Formik } from "formik"
import { FormControlLabel, Radio, RadioGroup } from "@mui/material"
import { TextField } from "./TextField"
import MaskedInput from "react-text-mask"
import { useCardNumberMask } from "../hooks/useCardNumberMask"
import { useNumberMask } from "../hooks/useNumberMask"

interface CardFormProps {
    user: User
    values: {
        cardType: string
        cardOwner: string
        cardNumber: string
        cardMonth: string
        cardYear: string
        cardCvv: string
    }
    setValues: {
        setCardType: (value: string) => void
        setCardOwner: (value: string) => void
        setCardNumber: (value: string) => void
        setCardMonth: (value: string) => void
        setCardYear: (value: string) => void
        setCardCvv: (value: string) => void
    }
}

export const CardForm: React.FC<CardFormProps> = ({ user, values, setValues }) => {
    const [cardNumberError, setCardNumberError] = useState("")

    const colors = useColors()
    const api = useApi()
    const { setUser } = useUser()
    const navigate = useNavigate()
    const { snackbar } = useSnackbar()
    const cardNumberMask = useCardNumberMask()
    const numberMask = useNumberMask(2, true)
    const threeNumberMask = useNumberMask(3)

    const radio_style = {
        "&.Mui-checked": {
            backgroundColor: colors.purple,
            color: "#9AF82E",
        },
        color: "#EBEBEB",
        backgroundColor: colors.dark_grey,
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

    return (
        <div className="CardForm-Component">
            <div className="type-container">
                <RadioGroup
                    value={values.cardType}
                    name="type"
                    onChange={(_, value) => setValues.setCardType(value)}
                    sx={{ flexDirection: "row", gap: "15vw" }}
                >
                    <FormControlLabel
                        value="debit"
                        sx={{ marginLeft: "0" }}
                        control={<Radio sx={radio_style} />}
                        label="Débito"
                    />
                    <FormControlLabel
                        value="credit"
                        sx={{ marginLeft: "0" }}
                        control={<Radio sx={radio_style} />}
                        label="Crédito"
                    />
                </RadioGroup>
            </div>

            <TextField
                placeholder="Nome registrado no cartão"
                name="name"
                value={values.cardOwner}
                onChange={(event) => setValues.setCardOwner(event.target.value)}
            />
            <MaskedInput
                mask={cardNumberMask}
                guide={false}
                name="number"
                value={values.cardNumber}
                onChange={(event) => setValues.setCardNumber(event.target.value)}
                onBlur={handleCardNumberBlur}
                render={(ref, props) => (
                    <TextField
                        inputRef={ref}
                        {...props}
                        placeholder="Número do cartão"
                        error={!!cardNumberError}
                        helperText={cardNumberError}
                    />
                )}
            />

            <h2>Data de expiração</h2>
            <div className="expiration-container">
                <MaskedInput
                    mask={numberMask}
                    guide={false}
                    name="expiration_month"
                    value={values.cardMonth}
                    onChange={(event) => setValues.setCardMonth(event.target.value)}
                    render={(ref, props) => <TextField inputRef={ref} {...props} placeholder="Mês" />}
                />
                <MaskedInput
                    mask={numberMask}
                    guide={false}
                    name="expiration_year"
                    value={values.cardYear}
                    onChange={(event) => setValues.setCardYear(event.target.value)}
                    render={(ref, props) => <TextField inputRef={ref} {...props} placeholder="Ano" />}
                />
                <MaskedInput
                    mask={threeNumberMask}
                    guide={false}
                    name="cvv"
                    value={values.cardCvv}
                    onChange={(event) => setValues.setCardCvv(event.target.value)}
                    render={(ref, props) => <TextField inputRef={ref} {...props} placeholder="CVV" />}
                />
            </div>
        </div>
    )
}
