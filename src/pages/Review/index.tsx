import React, { useState, useEffect } from "react"
import "./style.scss"
import { Button } from "../../components/Button"
import { useNavigate } from "react-router-dom"
import { CircularProgress } from "@mui/material"
import Rating from '@mui/material/Rating';

export const Review = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [value, setValue] = React.useState<number | null>(2);

    useEffect(() => {
        console.log(value)
    }, [value])

    return <div className="Review-Page">
        <div className="title-container">
            <h2>Avaliação</h2>
        </div>

        <div className="rating-container">
            <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                />
        </div>

        <div className="buttons-container">
            <Button onClick={() => navigate("/cart")} style={{ height: "10vw", width: "35vw", background: "linear-gradient(90deg, #9F9F9F 0%, #565656 91.94%)" }} >
                Cancelar
            </Button>
            <Button type="submit" style={{ height: "10vw", width: "35vw", marginRight: "1vw" }}>
                {loading ? (
                    <CircularProgress sx={{ color: "white" }} style={{ width: "6vw", height: "auto" }} />
                ) : (
                    "Salvar"
                )}
            </Button>
        </div>
    </div>
}