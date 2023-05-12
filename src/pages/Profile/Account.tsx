import { Form, Formik } from "formik"
import React from "react"
import { TextField } from "../../components/TextField"
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
                        <TextField name="name" value={values.name} onChange={handleChange} />
                    </Form>
                )}
            </Formik>
        </div>
    )
}
