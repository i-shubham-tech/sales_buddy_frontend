import React from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function DeliveryLocation() {
    return (
        <div style={{ display: "flex", background: "#353535", padding: 10, fontWeight: 600, gap: 3, borderRadius: 10 }}>
            <LocationOnIcon />
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <div>
                    <span>Delivery at: </span>
                    <span style={{ color: "#00e9ba", textDecoration: "underline" }}>Mumbai,400049</span>
                </div>
                <span>Will be delivered by 16 june 2025</span>
            </div>
        </div>
    )
}
