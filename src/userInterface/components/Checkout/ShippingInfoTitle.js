import { Typography } from '@mui/material'
import React from 'react'

export default function ShippingInfoTitle() {
    return (
        <div style={{ background: "#FFFFFF",padding:10,boxSizing:"border-box" }}>
            <div  style={{ display:"flex",justifyContent:"center" }}>
                <span>Continue Creating Account…</span>
            </div>
            <Typography sx={{ fontSize: 22,fontWeight:600,marginTop:1 }}>
                Enter Shipping Information
            </Typography>
        </div>
    )
}
