import React from "react"
import styles from "./styles"
import { FormControlLabel, Radio, RadioGroup } from "@mui/material"

interface ServiceProps {}

export const Service: React.FC<ServiceProps> = ({}) => {
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
        <RadioGroup
            value="{values.cardType}"
            name="type"
            //onChange={}
            sx={styles.radio}
        >
            <FormControlLabel
                value="sedex"
                sx={{ marginLeft: "0", fontSize: "7vw" }}
                control={<Radio sx={radio_style} />}
                label=""
            />
            <div style={{ flexDirection: "column", position: "relative", bottom: " 7vw", left: "8vw" }}>
                <div style={{ flexDirection: "row", gap: "2vw" }}>
                    <p style={{ fontSize: "4vw", fontWeight: "600", color: "#555555" }}>SEDEX: </p>
                    <p style={{ fontSize: "4vw", color: "#555555" }}>R$25,75</p>
                </div>
                <p style={{ fontSize: "2.8vw", color: "#555555" }}>Prazo de entrega de 3 dias úteis</p>
            </div>
        </RadioGroup>
    )
}
