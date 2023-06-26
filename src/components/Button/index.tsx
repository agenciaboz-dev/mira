import React from "react"
import { Button as MuiButton } from "@mui/material"
import { ButtonProps } from "@mui/material"
import { style } from "./style"

export const Button: React.FC<ButtonProps> = (props) => {
    const sx = { ...style, ...props.sx }
    return <MuiButton {...props} sx={sx} />
}
