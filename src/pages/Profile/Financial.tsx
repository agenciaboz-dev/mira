import React, { useEffect, useState } from "react"
import { Card as CardType, User } from "../../definitions/user"
import { Form, Formik } from "formik"
import { Card } from "../../components/Card"
import { FormControlLabel, Radio, RadioGroup } from "@mui/material"
import { Button } from "../../components/Button"
import { useColors } from "../../hooks/useColors"

interface FinancialProps {
    user: User
}

export const Financial: React.FC<FinancialProps> = ({ user }) => {
    const colors = useColors()

    const initialValues = {
        number: "",
        name: "",
        expiration: "",
        cvv: "",
        type: "",
    }

    const radio_style = {
        "&.Mui-checked": {
            color: "#9AF82E",
        },
        color: "#EBEBEB",
        backgroundColor: colors.purple,
        padding: 0,
        boxShadow: "2px 3px 0px #1A7FB7",
        borderRadius: "5px",
        marginRight: "2vw",
    }

    const handleSubmit = (values: CardType) => {
        if (!values.type) return

        console.log(values)
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

                        <Button type="submit">Salvar</Button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
