import React from "react"
import { Box } from "@mui/material"
import { useColors } from "../hooks/useColors"
import { Button } from "../components/Button"
import { useNavigate } from "react-router-dom"
import "./style.scss"
import Logo from "../images/mira_avatar.webp"

interface WildCardProps {}

export const WildCard: React.FC<WildCardProps> = ({}) => {
    const colors = useColors()
    const navigate = useNavigate()

    const style_h1 = {
        fontWeight: "800",
        "@media (max-width:768px)": {
            fontSize: "25vw",
        },
        "@media (min-width:768px)": {
            fontSize: "25vw",
        },
    }
    const style_img = {
        "@media (max-width:768px)": {
            width: "30vw",
        },
        "@media (min-width:768px)": {
            width: "10vw",
        },
    }

    return (
        <Box
            sx={{
                backgroundColor: colors.purple,
                flexDirection: "column",
                width: "100%",

                color: "white",
                alignItems: "center",
                justifyContent: "center",
                "@media (max-width:768px)": {
                    padding: "20vw 10vw",
                    gap: "15vw",
                    height: "100vh",
                },
                "@media (min-width:768px)": {
                    padding: "5vw",
                    gap: "2vw",
                    height: "100vh",
                },
            }}
        >
            <Box sx={{ flexDirection: "column", alignItems: "center" }}>
                <img src={Logo} className="img_style" />
                <Box sx={{ flexDirection: "column", alignItems: "center" }}>
                    <h1 className="h1_style">404</h1>
                    <p className="p_style" style={{}}>
                        Página não encontrada
                    </p>
                </Box>
            </Box>
            <Box
                sx={{
                    "@media (max-width:768px)": { gap: "3vw" },
                    "@media (min-width:768px)": { gap: "1vw" },
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <p className="p2_style">Deseja voltar para o início?</p>
                <Button fullWidth onClick={() => navigate("/")}>
                    Início
                </Button>
            </Box>
        </Box>
    )
}
