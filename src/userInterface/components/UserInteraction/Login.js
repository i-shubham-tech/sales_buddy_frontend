import { CheckBox, Close } from '@mui/icons-material'
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { generateOtp, postData } from '../../../backendservices/FetchNodeServices'

export default function Login({ openLoginDialog, setOpenLoginDialog, setOpenOtpDialog, setLoginBody, setOtpValue }) {
    const [inpValue, setInpValue] = useState("")
    const [error, setError] = useState("")
    const handleClick = async () => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        const mobileRegex = /^[0-9]{10}$/;

        if (inpValue.length == 0) {
            setError("Email/Mobile Number is required")
            return
        }
        if (emailRegex.test(inpValue)) {
            setLoginBody({
                "emailid": inpValue
            })

        }
        else if (mobileRegex.test(inpValue)) {
            setLoginBody({
                "mobileno": inpValue
            })

        }
        else {
            setError("Please Enter Valid Email/Mobile Number")
            return
        }

    const genOtp = generateOtp()
    // const resp = await postData("userinterface/send-otp", { code: genOtp })
    alert(genOtp)
    setOtpValue(genOtp)
    setOpenLoginDialog(false)
    setOpenOtpDialog(true)
}
useEffect(() => {
}, [openLoginDialog])
return (
    <Dialog fullWidth open={openLoginDialog} onClose={() => setOpenLoginDialog(false)} >
        <DialogContent sx={{ background: "#191919", color: 'white' }}>
            <div style={{ maxWidth: "600px", width: "100%", background: "#191919", padding: "50px 70px", boxSizing: "border-box", color: "white", display: "flex", flexDirection: "column", gap: 20, position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px', position: "absolute", top: 0, right: 0 }}>
                    <Close sx={{ color: 'white', cursor: 'pointer' }} onClick={() => setOpenLoginDialog(false)} />
                </div>
                <div style={{ display: "flex", gap: 40, border: "1px solid gray", padding: "15px", justifyContent: "center", alignItems: "center", color: "white" }}>
                    <span>Login</span>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <span style={{ borderLeft: "1px solid gray", height: 5 }}></span>
                        <span style={{ border: "1px solid gray", fontSize: 12, padding: 3, display: "flex", alignItems: "center", justifyContent: "center" }}>OR</span>
                        <span style={{ borderLeft: "1px solid gray", height: 5 }}></span>
                    </div>
                    <span>Create Account</span>
                </div>
                <div style={{ alignSelf: 'center' }}>
                    Please enter your Email ID or Phone number
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "center" }}>
                    <TextField
                        fullWidth
                        sx={{
                            '& .MuiInputBase-input': {
                                color: 'white',
                                border: "2px solid white"
                            },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    border: 'none'
                                },
                                '&:hover fieldset': {
                                    border: 'none'
                                }
                            }
                        }}
                        placeholder='Enter your Email ID or Phone number'
                        onChange={(e) => setInpValue(e.target.value)}
                        onFocus={() => setError("")}
                    />
                    <Typography variant="h7" sx={{ color: "red" }}>{error}</Typography>
                </div>
                <div style={{ alignSelf: 'center', display: "flex", gap: 7, alignItems: 'center' }}>
                    <Checkbox sx={{ padding: 0, color: '#12DAA8', '&.Mui-checked': { color: '#12DAA8' } }} defaultChecked={false} />
                    <span>Keep me signed in</span>
                </div>
                <div style={{ alignSelf: 'center', marginTop: 10 }}>
                    By continuing you agree to our
                    <span style={{ color: "#12C270", textDecoration: "underline" }}> Terms of Use </span>&
                    <span style={{ color: "#12C270", textDecoration: "underline" }}> Privacy Policy</span>
                </div>
                <div>
                    <Button fullWidth sx={{ background: "#12DAA8", color: "black", fontSize: 12, fontWeight: 700 }} onClick={handleClick}>
                        continue
                    </Button>
                </div>
            </div>
            {/* <OTPInput/> */}
        </DialogContent>
    </Dialog>


)
}
