import { Box, Skeleton } from "@mui/material"

export const SongSection = () => {
    return (
        <Box>
            <Skeleton width={600} height={50} variant="rounded"/>
            <Skeleton width={600} height={50} variant="rounded"/>
            <Skeleton width={600} height={50} variant="rounded"/>
        </Box>

    )
}