import { Form, Formik } from "formik"
import React from "react"
import { TextField } from "../../components/TextField"
import { useColors } from "../../hooks/useColors"
import { useUser } from "../../hooks/useUser"

interface AccountProps {}

interface FormValues {
    name: string
    // last_name: string
    email: string
    // phone: string
}

export const Account: React.FC<AccountProps> = ({}) => {
    const { user } = useUser()

    const colors = useColors()

    const initialValues: FormValues = user || {
        name: "",
        email: "",
    }

    const handleSubmit = (values: FormValues) => {
        console.log(values)
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
                            InputLabelProps={{
                                sx: {
                                    color: colors.purple,
                                    backgroundColor: "white",
                                    padding: "1vw",
                                    borderRadius: "2vw",
                                    paddingTop: 0,
                                },
                            }}
                        />
                    </Form>
                )}
            </Formik>
        </div>
    )
}
