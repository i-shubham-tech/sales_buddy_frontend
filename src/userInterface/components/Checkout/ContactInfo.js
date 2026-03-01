import { TextField, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux';

export default function ContactInfo() {
    const user = useSelector((state) => state.user);
    const [email, setEmail] = React.useState(user?.emailid || '');
    const [mobileNo, setMobileNo] = React.useState(user?.mobileno || '');
    const [isEditing, setIsEditing] = React.useState(false);

    const handleChange = () => {
        setIsEditing(!isEditing);
    };

    const textFieldStyle = () => ({
        borderRadius: "10px",
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
    });
    return (
        <div style={{ background: "#fff", padding: "15px 20px" }}>
            <Typography fontWeight={"bold"}>Contact Information</Typography>
            <div style={{ display: "flex", gap: 15, alignItems: "center" }}>
                {isEditing ? (
                    <>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <div>
                                <Typography>Email</Typography>
                                <TextField
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    size="small"
                                    placeholder="Email"
                                    sx={textFieldStyle}
                                />
                            </div>
                            <div style={{ borderRight: "1px solid black", height: 20, width: 1, marginTop: isEditing ? "20px" : 0 }}></div>
                            <div>
                                <Typography>Mobile</Typography>
                                <TextField
                                    value={mobileNo}
                                    onChange={(e) => setMobileNo(e.target.value)}
                                    size="small"
                                    placeholder="Mobile"
                                    sx={textFieldStyle}
                                />
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <Typography>
                            <span>Email :</span> <span  style={{opacity:0.8}}>{email || "Enter Email"}</span>
                        </Typography>
                        <span style={{ borderRight: "1px solid black", height: 15, width: 1 }}></span>
                        <Typography>
                            <span>Mobile :</span> <span style={{opacity:0.8}}>{mobileNo || "Enter Mobile Number"}</span>
                        </Typography>
                    </>
                )}
            </div>
            <Typography
                onClick={handleChange}
                sx={{
                    color: "#188466",
                    textDecoration: "underline",
                    marginTop: 3,
                    cursor: "pointer"
                }}
            >
                {isEditing ? "Save" : "Change"}
            </Typography>
        </div>
    )
}
