import { Box, SxProps } from "@mui/material"
import React from "react"
import { ReactComponent as LogoIcon } from "../../images/logo.svg"
import { ReactComponent as AppleIcon } from "../../images/apple-download.svg"
import { ReactComponent as GoogleIcon } from "../../images/google-download.svg"
import { useColors } from "../../hooks/useColors"

import { Button } from "../../components/Button"

interface DownloadProps {}

export const Download: React.FC<DownloadProps> = ({}) => {
    const colors = useColors()

    const platform_style: SxProps = {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "6vw",
        color: "white",
        gap: "5vw",
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
                    <a href="https://play.google.com/store/apps/details?id=com.mira.guide">
                        <GoogleIcon
                            style={{
                                position: "relative",
                                left: "4.5vw",
                                width: "70vw",
                                height: "auto",
                                backgroundColor: "white",
                            }}
                        />
                    </a>
                    <a href="https://play.google.com/store/apps/details?id=com.mira.guide">
                        <AppleIcon
                            style={{
                                position: "relative",
                                left: "4.5vw",
                                width: "70vw",
                                height: "auto",
                                backgroundColor: "white",
                            }}
                        />
                    </a>
                </Box>
            </Box>
        </Box>
    )
}
