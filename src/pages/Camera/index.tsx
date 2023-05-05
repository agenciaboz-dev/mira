import { Button } from "@mui/material"
import React from "react"
import { Scanner } from "../../components/Scanner"
import "./style.scss"

interface CameraProps {}

export const Camera: React.FC<CameraProps> = ({}) => {
    const handleResult = (result: string) => {
        console.log(result)
    }
    return (
        <div className="Camera-Page">
            <Scanner handleResult={handleResult} />
            <Button>Cancelar leitura</Button>
        </div>
    )
}
