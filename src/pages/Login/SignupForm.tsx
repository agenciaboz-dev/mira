import React from "react"

interface SignupFormProps {
    onSwitch: () => void
}

export const SignupForm: React.FC<SignupFormProps> = ({ onSwitch }) => {
    return (
        <div className="SignupForm-Component">
            <h1>Cadastro</h1>

            <div className="signup-text">
                <p>Não tem conta?</p>
                <p className="link" onClick={() => onSwitch()}>
                    Cadastre-se
                </p>
            </div>

            <div className="background"></div>
        </div>
    )
}
