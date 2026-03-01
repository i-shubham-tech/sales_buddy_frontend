import React from 'react'
import { Typography, Grid2 } from '@mui/material'

export default function DetailSpecifiaction() {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <Typography sx={{ fontSize: 17, fontWeight: 600 }}>MOBILE CATEGORY</Typography>
            <Grid2 container sx={{ fontWeight: 500, fontSize: 14 }}>
                <Grid2 size={4} >
                    <Typography>Mobile Type</Typography>
                    <Typography >Android Smartphone</Typography>
                </Grid2>
                <Grid2 size={4}>
                    <Typography >Mobile Design</Typography>
                    <Typography>Touch</Typography>
                </Grid2>
            </Grid2>
        </div>
    )
}
