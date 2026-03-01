import React, { useState, useRef, useEffect } from 'react';
import { TextField, Button, Typography, Box, Dialog, DialogContent } from '@mui/material';
import { Close } from '@mui/icons-material';

const OTPInput = ({ length = 4, otpDialog, setOtpDialog, setField, value }) => {
    const [otp, setOtp] = useState(["", "", "", ""]);
    const [timer, setTimer] = useState(60)
    const [resend, setResend] = useState(false)
    const [error, setError] = useState("")
    const inputsRef = useRef([]);


    // alert(refresh)
    const handleChange = (element, index) => {

        const value = element.target.value.replace(/\D/g, '');
        if (!value) return;

        const newOtp = [...otp];
        newOtp[index] = value[0];
        setOtp(newOtp);

        // Move to next input
        if (index < length - 1) {
            inputsRef.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {

        if (e.key === 'Backspace') {
            if (!otp[index].length == 1 && index > 0) {
                inputsRef.current[index - 1].focus();
            }
            const newOtp = [...otp];
            newOtp[index] = '';
            setOtp(newOtp);
        }
    };

    const handleSubmit = () => {
        const Curotp = "2222"
        const fullOtp = otp.join('');
        if (Curotp !== fullOtp) {
            setError("Please Enter Correct OTP")
            return
        }
        //after verify opt working  TO DO
        setField(value)
        setOtpDialog(false)

    };
    useEffect(() => {
        if (otpDialog) {
            setTimer(60);
            setOtp(["", "", "", ""])// Reset timer when dialog opens
            const interval = setInterval(() => {
                setTimer((prev) => (prev > 0 ? prev - 1 : 0));
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [otpDialog, resend]);

    const textFieldStyle = () => ({
        borderRadius: "5px",
        '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: 'white', borderRadius: "5px" },
            '&:hover fieldset': { borderColor: 'white' },
            '&.Mui-focused fieldset': { borderColor: 'white' }
        },
        '& .MuiInputLabel-root': { color: 'black', background: "red" },
        '& .MuiOutlinedInput-input': {
            color: 'white',
            borderRadius: "5px",
            maxHeight: 40,
            maxWidth: 40,
            textAlign: "center",
            '&::placeholder': { color: 'black' }
        }
    });
    return (
        <Dialog open={otpDialog} onClose={()=>setOtpDialog(false)}>
            <DialogContent sx={{ background: "#191919", color: "white" }}>
                <Box display="flex" position={"relative"} flexDirection="column" alignItems="center" gap={1} padding={"10px 30px"}>
                    <Close sx={{ color: 'white', cursor: 'pointer', position: "absolute", right: 0, top: 0 }} onClick={() => setOtpDialog(false)} />
                    <Typography variant="h6" fontWeight="bold">VERIFY WITH OTP</Typography>
                    <Typography variant="h7" sx={{ margin: 0 }}>sent to {value}</Typography>
                    <Box display="flex" marginTop={3} gap={3}>
                        {otp.map((digit, i) => (
                            <TextField
                                sx={textFieldStyle}
                                value={digit}
                                onFocus={() => setError("")}
                                onChange={(e) => handleChange(e, i)}
                                onKeyDown={(e) => handleKeyDown(e, i)}
                                inputRef={(el) => (inputsRef.current[i] = el)}
                            />
                        ))}
                    </Box>
                    <Typography variant="h7" sx={{ marginTop: 2, color: "red" }}>{error}</Typography>
                    <Typography variant="h7" sx={{ marginTop: 2, display: "flex", alignItems: "center" }}>
                        {
                            timer > 0 ?
                                <>
                                    <span style={{ fontWeight: 600 }}>Resend OTP in: {timer} sec</span>
                                </>
                                :
                                <>
                                    <span style={{ fontWeight: 600 }}>Didn't Received Your OTP?</span>
                                    <span style={{ color: "#12da9d", textDecoration: "underline",fontWeight: 600,cursor:"pointer"}} onClick={()=>setResend(!resend)}>Resend OTP</span>
                                </>
                        }
                    </Typography>
                    <Button
                        variant="contained"
                        fullWidth
                        sx={{ marginTop: 3, fontWeight: 600, background: "#353535", cursor: otp.some((element) => element === "") ? "not-allowed" : "pointer" }}
                        onClick={handleSubmit}
                        disabled={otp.some((element) => element === "") || timer == 0}
                    >
                        Verify OTP
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default OTPInput;
