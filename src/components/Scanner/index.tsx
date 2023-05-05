import React, { useEffect, useState } from "react"
import { QrReader, OnResultFunction } from "react-qr-reader"
import { Result } from "@zxing/library"
import "./style.scss"

interface ScannerProps {
    handleResult: (result: string) => void
}

export const Scanner: React.FC<ScannerProps> = ({ handleResult }) => {
    const onResult: OnResultFunction = (result, error) => {
        if (result?.getText() && result.getText() != "e") {
            handleResult(result.getText())
        }
    }

    return (
        <div className="Scanner-Component">
            <QrReader
                constraints={{ facingMode: "environment" }}
                onResult={onResult}
                videoStyle={{ width: null, left: null }}
                videoContainerStyle={{ height: "80vh", justifyContent: "center" }}
            />
        </div>
    )
}
