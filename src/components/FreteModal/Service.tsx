import React from "react"
import styles from "./styles"
import { Box, FormControlLabel, Radio, RadioGroup } from "@mui/material"
import { CurrencyText } from "../CurrencyText"

interface ServiceProps {
    quotation: Quotation
}

export const Service: React.FC<ServiceProps> = ({ quotation }) => {
    const radio_style = {
        "&.Mui-checked": {
            backgroundColor: "purple",
            color: "#9AF82E",
        },
        ".MuiFormControlLabel-root": {
            fontWeight: "700",
        },

        color: "#EBEBEB",
        backgroundColor: "light_gray",
        padding: 0,
        boxShadow: "2px 3px 0px #1A7FB7",
        borderRadius: "50%",
        marginRight: "2vw",
    }

    return (
        <Box sx={{ flexDirection: "column", gap: "2vw" }}>
            <FormControlLabel
                value={quotation.id}
                sx={{ marginLeft: "0" }}
                control={<Radio sx={radio_style} />}
                label={
                    <Box sx={{ flexDirection: "column" }}>
                        <div style={{ gap: "2vw" }}>
                            <p style={{ fontSize: "4vw", fontWeight: "600", color: "#555555" }}>
                                {quotation.shipping_carrier}:{" "}
                            </p>
                            <p style={{ fontSize: "4vw", color: "#555555" }}>{<CurrencyText value={quotation.price} />}</p>
                        </div>
                        <p style={{ fontSize: "2.8vw", color: "#555555" }}>
                            Prazo de entrega de {quotation.delivery_time} dias úteis
                        </p>
                    </Box>
                }
            />
        </Box>
    )
}
