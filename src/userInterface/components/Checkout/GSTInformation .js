import { TextField, Typography } from '@mui/material'
import React from 'react'

export default function GSTInformation() {
    return (
        <div style={{ background: "#FFFFFF", padding: 15, display: "flex", flexDirection: "column", gap: 5 }}>
            <Typography sx={{ fontWeight: "bold" }}>GST Information(Optional)</Typography>
            <Typography sx={{fontSize:14}}>GST Number</Typography>
                <TextField
                    placeholder='Enter GST Number'
                    sx={{
                        borderRadius: "10px",
                        marginTop: 1,
                        maxWidth:280,
                        '& .MuiOutlinedInput-root': {
                            '& fieldset': { borderColor: 'white', borderRadius: "10px" },
                            '&:hover fieldset': { borderColor: 'white' },
                            '&.Mui-focused fieldset': { borderColor: 'white' }
                        },
                        '& .MuiInputLabel-root': { color: 'black', background: "red" },
                        '& .MuiOutlinedInput-input': {
                            color: 'black',
                            background: '#F6F6F6',
                            borderRadius: "10px",
                            '&::placeholder': { color: 'black' }
                        }
                    }}
                />
        </div>
    )
}
