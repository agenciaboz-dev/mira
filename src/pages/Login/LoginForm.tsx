import React from "react"

interface LoginFormProps {
    onSwitch: () => void
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSwitch }) => {
    return (
        <div className="LoginForm-Component">
            <h1>Login</h1>
            <p>Por favor, faça o login para continuar</p>

            <div className="signup-text">
                <p>Não tem conta?</p>
                <p className="link" onClick={() => onSwitch()}>
                    Cadastre-se
                </p>
            </div>
        </div>
    )
}
