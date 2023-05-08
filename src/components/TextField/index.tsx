import React from "react"
import { TextField as Text } from "@mui/material"
import { TextFieldProps } from "@mui/material"
import styled from "@emotion/styled"

const StyledTextField = styled(Text)`
    & .MuiOutlinedInput-root {
        &.Mui-focused fieldset {
            border-color: transparent;
        }
    }

    & .MuiOutlinedInput-input {
        background-color: white;
        border-radius: 10vw;
        &::placeholder {
            color: #555555;
            opacity: 1;
            font-weight: bold;
        }
    }
`

export const TextField: React.FC<TextFieldProps> = (props) => {
    return (
        <StyledTextField
            {...props}
            InputProps={{
                sx: {
                    backgroundColor: "white",
                    borderRadius: "10vw",
                    boxShadow: "2px 8px 0px #1A7FB7",
                },
            }}
        />
    )
}
