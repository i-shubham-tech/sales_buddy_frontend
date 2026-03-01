import React from 'react'
import StarIcon from '@mui/icons-material/Star';

export default function ProductSummaryCard({data}) {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }} >
            <h3 style={{ margin: 0 }}>{data.productname}
                ({data.productstorage},{data.productcolorname})</h3>
            <div style={{ display: "flex", gap: 12 }}>
                <span style={{ background: "#cffff3", color: "#088466", padding: "10px 14px", borderRadius: 20, fontWeight: 900, fontSize: 12 }}>
                    4000 off at Payment OTP page
                </span>
                <span style={{ background: "#cffff3", color: "#088466", padding: "10px 14px", borderRadius: 20, fontWeight: 900, fontSize: 12 }}>
                    6M No Cost EMI
                </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", color: "#00e9ba", fontSize: 15 }}>
                <span>{data.ratings}</span>
                <StarIcon sx={{ fontSize: 18 }} />
                <span style={{ marginLeft: 6 }}>(14 Rating & 6 Reviews)</span>
            </div>
        </div>
    )
}
