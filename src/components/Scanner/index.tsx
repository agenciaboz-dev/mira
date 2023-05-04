import React, { useEffect, useState } from "react"
import { QrReader, OnResultFunction } from "react-qr-reader"
import { Result } from "@zxing/library"
import "./style.scss"

interface ScannerProps {}

export const Scanner: React.FC<ScannerProps> = ({}) => {
    const [data, setData] = useState<string[]>([])

    const handleResult: OnResultFunction = (result, error) => {
        if (result?.getText() && result.getText() != "e") {
            setData([...data, result.getText()])
        }
    }

    useEffect(() => {
        console.log(data)
    }, [data])

    return (
        <div className="Scanner-Component">
            <QrReader constraints={{ facingMode: "environment" }} onResult={handleResult} />
            {data.map((item) => (
                <p key={data.indexOf(item)}>{item}</p>
            ))}
        </div>
    )
}
