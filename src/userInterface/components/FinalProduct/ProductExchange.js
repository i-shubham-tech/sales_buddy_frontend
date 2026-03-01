import React from 'react'
import { Button, Divider, Radio } from '@mui/material'

export default function ProductExchange() {
    return (
        <div style={{ border: "1.5px solid gray", borderRadius: 4, padding: 15, display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ opacity: "1", display: "flex", alignItems: "flex-start", gap: 20 }}>
                <Radio
                    sx={{

                        padding: 0,
                        color: "white",
                        '&.Mui-checked': {
                            color: "#00e9ba"
                        }
                    }}
                />
                <div style={{ display: "flex", flexDirection: "column", gap: 10, fontWeight: 600 }}>
                    <span>With Exchange up to &#x20B9;62,475 off</span>
                    <div style={{ maxWidth: "400px" }}>
                        <Button fullWidth sx={{ background: "#12daa8", color: "black" }}>Choose Phone for Exchange</Button>
                    </div>
                    <span style={{ color: "#00e9ba", textDecoration: "underline" }}>How does exchange work?</span>
                </div>

            </div>
            <Divider sx={{ background: "gray" }} />
            <div style={{ opacity: "1", display: "flex", alignItems: "center", gap: 20 }}>
                <Radio
                    sx={{

                        padding: 0,
                        color: "white",
                        '&.Mui-checked': {
                            color: "#00e9ba"
                        }
                    }}
                />
                <div style={{ fontWeight: 600 }}>
                    Without Exchange
                </div>

            </div>



        </div>
    )
}
