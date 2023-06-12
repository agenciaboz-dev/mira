import React from "react"
import { MenuItem, TextField } from "@mui/material"

interface PreparationAddornmentProps {
    handleChange: React.ChangeEventHandler<HTMLInputElement>
    value: number
}

export const PreparationAddornment: React.FC<PreparationAddornmentProps> = ({ handleChange, value }) => {
    const units = [
        {
            id: 1,
            name: "horas",
        },
        {
            id: 2,
            name: "minutos",
        },
        {
            id: 3,
            name: "segundos",
        },
    ]

    return (
        <TextField
            required
            select
            name="prep_unit"
            value={value}
            onChange={handleChange}
            variant="standard"
            sx={{ width: "12vw" }}
        >
            {units.map((unit) => (
                <MenuItem key={unit.id} value={unit.id} style={{ width: "100%" }}>
                    {unit.name}
                </MenuItem>
            ))}
        </TextField>
    )
}
