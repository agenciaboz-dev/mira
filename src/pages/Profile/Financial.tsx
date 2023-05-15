import React from "react"
import { Card as CardType, User } from "../../definitions/user"
import { Form, Formik } from "formik"
import { Card } from "../../components/Card"

interface FinancialProps {
    user: User
}

export const Financial: React.FC<FinancialProps> = ({ user }) => {
    const initialValues = {
        number: "",
        name: "",
        expiration: "",
        cvv: "",
    }

    const handleSubmit = (values: CardType) => {
        console.log(values)
    }

    return (
        <div className="Financial-Component">
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                {({ values, handleChange }) => (
                    <Form>
                        <h2>Financeiro</h2>
                        <Card card={values} />
                    </Form>
                )}
            </Formik>
        </div>
    )
}
