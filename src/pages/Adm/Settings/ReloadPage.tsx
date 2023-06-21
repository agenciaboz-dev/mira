import React, { useState } from "react"
import { Form, Formik } from "formik"
import { TextField, Button, CircularProgress } from "@mui/material"
import MaskedInput from "react-text-mask"
import { useNumberMask } from "burgos-masks"
import { useApi } from "../../../hooks/useApi"

interface ReloadPageProps {}

interface FormValues {
    time: string
}

export const ReloadPage: React.FC<ReloadPageProps> = ({}) => {
    const numberMask = useNumberMask({})
    const api = useApi()

    const [loading, setLoading] = useState(false)

    const initialValues: FormValues = {
        time: "",
    }

    const handleSubmit = (values: FormValues) => {
        if (loading) return
        setLoading(true)

        api.tools.reload({
            data: values,
            callback: () => {},
            finallyCallback: () => setLoading(false),
        })
    }

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({ values, handleChange }) => (
                <Form style={{ gap: "1vw" }}>
                    <MaskedInput
                        mask={numberMask}
                        guide={false}
                        value={values.time}
                        onChange={handleChange}
                        name="time"
                        render={(ref, props) => (
                            <TextField
                                inputRef={ref}
                                {...props}
                                label="Reiniciar painel em todos os dispositivos"
                                name="time"
                                placeholder="Tempo em segundos"
                                InputProps={{ endAdornment: <p>segundos</p> }}
                            />
                        )}
                    />
                    <Button type="submit" variant="contained">
                        {loading ? <CircularProgress size={"1.5rem"} sx={{ color: "white" }} /> : "Enviar"}
                    </Button>
                </Form>
            )}
        </Formik>
    )
}
