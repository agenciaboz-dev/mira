import React from "react"
import { Box } from "@mui/material"
import { useColors } from "../hooks/useColors"
import { Button } from "../components/Button"
import { useNavigate } from "react-router-dom"

interface WildCardProps {}

export const WildCard: React.FC<WildCardProps> = ({}) => {
    const colors = useColors()
    const navigate = useNavigate()

    return (
        <Box
            sx={{
                flexDirection: "column",
                width: "100vw",
                backgroundColor: colors.purple,
                height: "100vh",
                color: "white",
                alignItems: "center",
                justifyContent: "center",
                padding: "20vw 10vw",
                gap: "5vw",
            }}
        >
            <h1 style={{ fontSize: "20vw" }}>404</h1>
            <p style={{ textAlign: "center" }}>Página não encontrada, voltar para o início?</p>
            <Button fullWidth onClick={() => navigate("/")}>
                Início
            </Button>
        </Box>
    )
}
