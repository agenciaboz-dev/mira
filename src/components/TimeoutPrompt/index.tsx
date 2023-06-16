import { Dialog, DialogContent, DialogTitle } from "@mui/material"
import React from "react"
import styles from "./styles"
import { CountdownCircleTimer } from "react-countdown-circle-timer"
import { Button } from "../Button"

interface TimeoutPromptProps {
    open: boolean
    setActive: () => void
}

export const TimeoutPrompt: React.FC<TimeoutPromptProps> = ({ open, setActive }) => {
    return (
        <Dialog open={open} sx={styles.dialog} PaperProps={{ sx: styles.paper }}>
            <DialogTitle sx={styles.title}>Ainda está aí?</DialogTitle>

            <DialogContent sx={styles.body}>
                <CountdownCircleTimer
                    isPlaying
                    duration={120}
                    colors={["#9AF82E", "#9AF82E", "#2494C2", "#2494C2"]}
                    colorsTime={[120, 90, 60, 0]}
                >
                    {({ remainingTime }) => remainingTime}
                </CountdownCircleTimer>
                <Button fullWidth onClick={() => setActive()}>
                    Sim
                </Button>
            </DialogContent>
        </Dialog>
    )
}
