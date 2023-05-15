import React from "react"
import { FormControlLabel, Checkbox as MuiCheckbox } from "@mui/material"
import { useColors } from "../../hooks/useColors"

interface CheckboxProps {
    value: boolean
    handleChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void
    label: string
}

export const Checkbox: React.FC<CheckboxProps> = ({ value, handleChange, label }) => {
    const colors = useColors()

    return (
        <FormControlLabel
            sx={{ gap: "3vw", margin: "0", whiteSpace: "nowrap" }}
            control={
                <MuiCheckbox
                    onChange={handleChange}
                    sx={{
                        "&.Mui-checked": {
                            color: "#9AF82E",
                        },
                        color: "#EBEBEB",
                        backgroundColor: colors.purple,
                        padding: 0,
                        boxShadow: "3px 5px 0px #1A7FB7",
                        borderRadius: "5px",
                    }}
                    checked={value}
                />
            }
            label={label}
        />
    )
}
