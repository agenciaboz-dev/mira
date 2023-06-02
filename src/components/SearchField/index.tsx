import { TextField, Box } from "@mui/material"
import React, { useState } from "react"
import { Product } from "../../definitions/product"
import SearchIcon from "@mui/icons-material/Search"

interface SearchFieldProps {
    onSearch: (values: Product[]) => void
    list: Product[]
    button?: React.ReactElement
}

export const SearchField: React.FC<SearchFieldProps> = ({ onSearch, list, button = <></> }) => {
    const [value, setValue] = useState("")

    const handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (event) => {
        setValue(event.target.value)
        console.log(event.target.value)
    }

    const Button = () => button

    return (
        <Box sx={{ gap: "1vw" }}>
            <TextField
                label="Buscar"
                value={value}
                onChange={handleChange}
                InputProps={{ startAdornment: <SearchIcon /> }}
                placeholder="Digite para filtrar"
                inputProps={{ style: { paddingLeft: "0.5vw" } }}
            />
            <Button />
        </Box>
    )
}
