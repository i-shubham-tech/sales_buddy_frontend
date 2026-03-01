import React from 'react'
import { Typography, Grid2, Divider } from '@mui/material'
import DetailSpecifiaction from './DetailSpecifiaction'

export default function Specification() {
    return (
        <div style={{ position: "relative", border: "1px solid gray", borderRadius: 10, padding: 30, paddingBottom: 100, maxHeight: 445, display: "flex", flexDirection: "column", gap: 10, marginTop: 30 }}>
            <div style={{ position: "absolute", bottom: 25, left: "45%", padding: "6px 12px", border: "1px solid white", borderRadius: 6, fontWeight: 600 }}>
                View More
            </div>
            <DetailSpecifiaction />
            <Divider sx={{ border: "1.5px solid gray", opacity: ".8", marginTop: 3 }} />
            <DetailSpecifiaction />
            <Divider sx={{ border: "1.5px solid gray", opacity: ".8", marginTop: 3 }} />
            <DetailSpecifiaction />
            <Divider sx={{ border: "1.5px solid gray", opacity: ".8", marginTop: 3 }} />




        </div>
    )
}
