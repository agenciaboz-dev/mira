import React, { useState } from "react"
import "./style.scss"
import { ReactComponent as Logo } from "../../images/logo.svg"
import { ReactComponent as Divider } from "../../images/pasta_de_dente.svg"
import { ReactComponent as BackgroundElement } from "../../images/background_element.svg"
import { LoginForm } from "./LoginForm"
import { SignupForm } from "./SignupForm"
import { useColors } from "../../hooks/useColors"
import SlideRoutes from "react-slide-routes"
import { Route, useLocation } from "react-router-dom"

interface LoginProps {}

export const Login: React.FC<LoginProps> = ({}) => {
    const colors = useColors()
    const location = useLocation()

    return (
        <div className="Login-Page">
            {/* <BackgroundElement
                className={`background-element ${isSignUp ? "bigger" : ""}`}
                style={{
                    position: "absolute",
                    width: "100vw",
                    top: "30vh",
                }}
            /> */}
            <div className="form-container">
                <SlideRoutes duration={1000} animation="vertical-slide">
                    <Route
                        index
                        element={
                            <div style={{ position: "relative", flexDirection: "column", alignItems: "center", height: "100%" }}>
                                <Logo style={{ width: "50vw", height: "auto", flexShrink: 0, marginTop: "8vw" }} />
                                <Divider style={{ position: "absolute", width: "100vw", top: "50vw", objectFit: "fill" }} />
                                <LoginForm />
                            </div>
                        }
                    />
                    <Route path="/signup" element={<SignupForm />} />
                </SlideRoutes>
            </div>
        </div>
    )
}
