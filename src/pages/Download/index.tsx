import { Box, SxProps } from "@mui/material"
import React from "react"
import { ReactComponent as LogoIcon } from "../../images/logo.svg"
import { useColors } from "../../hooks/useColors"
import AdbIcon from "@mui/icons-material/Adb"
import AppleIcon from "@mui/icons-material/Apple"
import { Button } from "../../components/Button"

interface DownloadProps {}

export const Download: React.FC<DownloadProps> = ({}) => {
    const colors = useColors()

    const platform_style: SxProps = {
        flexDirection: "column",
        gap: "5vw",
        alignItems: "center",
        fontSize: "6vw",
        color: "white",
        width: "35vw",
    }

    const platform_icon: SxProps = {
        width: "80%",
        height: "auto",
    }

    return (
        <Box
            sx={{
                flexDirection: "column",
                gap: "15vw",
                alignItems: "center",
                backgroundColor: colors.purple,
                width: "100vw",
                padding: "10vw",
            }}
        >
            <Box
                sx={{
                    borderRadius: "100%",
                    width: "60vw",
                    height: "60vw",
                    backgroundColor: "white",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <LogoIcon style={{ width: "80%" }} />
            </Box>

            <p style={{ color: "white", fontSize: "7vw", textAlign: "center" }}>
                Escolha sua plataforma e baixe o nosso app
            </p>

            <Box sx={{ justifyContent: "space-between", width: "100%" }}>
                <Box sx={platform_style}>
                    <p>Android</p>
                    <AdbIcon sx={platform_icon} />
                    <Button fullWidth href="https://play.google.com/store/apps/details?id=com.mira.guide">
                        Baixar
                    </Button>
                </Box>
                <Box sx={platform_style}>
                    <p>iOs</p>
                    <AppleIcon sx={platform_icon} />
                    <Button fullWidth href="https://play.google.com/store/apps/details?id=com.mira.guide">
                        Baixar
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}
