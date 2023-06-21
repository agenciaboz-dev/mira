import React from "react"
import { Skeleton, Box } from "@mui/material"
import { useArray } from "burgos-array"

interface TableSkeletonProps {}

export const TableSkeleton: React.FC<TableSkeletonProps> = ({}) => {
    const skeletons = useArray().newArray(9)

    return (
        <Box sx={{ flexDirection: "column", marginTop: "3.5vw", gap: "0.5vw", paddingBottom: "5.8vw" }}>
            {skeletons.map((skeleton) => (
                <Skeleton variant="rectangular" key={skeleton} sx={{ width: "100%", height: "3vw" }} animation="wave" />
            ))}
        </Box>
    )
}
