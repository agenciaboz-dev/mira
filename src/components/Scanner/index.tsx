import React, { useEffect, useState } from "react"
import { QrReader, OnResultFunction } from "react-qr-reader"
import "./style.scss"
import { ReactComponent as Border } from "../../images/scanner/border.svg"

interface ScannerProps {
    handleResult: (result: string) => void
    scanning: boolean
}

export const Scanner: React.FC<ScannerProps> = ({ handleResult, scanning }) => {
    const onResult: OnResultFunction = (result, error) => {
        if (result?.getText() && result.getText() != "e") {
            handleResult(result.getText())
        }
    }

    return (
        <div className="Scanner-Component">
            <QrReader
                constraints={{ facingMode: "environment" }}
                scanDelay={scanning ? 500 : Number.MAX_SAFE_INTEGER}
                onResult={onResult}
                videoStyle={{ width: null, left: null }}
                videoContainerStyle={{ height: "100vh", justifyContent: "center" }}
            />
            <Border className="scanner-placeholder" />
        </div>
    )
}
