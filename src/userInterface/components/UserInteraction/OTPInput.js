import React, { useState, useRef, useEffect } from 'react';
import { TextField, Button, Typography, Box, Dialog, DialogContent, useMediaQuery } from '@mui/material';
import { Close } from '@mui/icons-material';
import { generateOtp, postData } from '../../../backendservices/FetchNodeServices';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const OTPInput = ({ status, length = 4, openOtpDialog, setOpenOtpDialog, loginBody, generatedOTP, setOtpValue }) => {
    const matches = useMediaQuery('(max-width:780px)');
    const navigate = useNavigate();
    const [otp, setOtp] = useState(["", "", "", ""]);
    const [resend, setResend] = useState(false)
    const [timer, setTimer] = useState(60)
    const [error, setError] = useState("")
    const dispatch = useDispatch()

    const inputsRef = useRef([]);

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

    const handleValidation = () => {
        if (otp.some((element) => element === "") || timer === 0) {
            return false;
        }
        const currentOTP = otp.join('');
        if (generatedOTP != currentOTP) {
            setError("Please Enter Correct OTP");
            return false;
        }
        return true;
    };

    const handleSubmit = async () => {
        const isValid = handleValidation()

        if (!isValid) return

        const response = await postData("userinterface/userinterface_handle_user",loginBody)
        console.log('s',response)
        if (response?.status) {
            dispatch({ type: "ADD_USER", payload:response?.data})
            if (status == "cart") {
                navigate("/checkout")
            }
        }
        else {
            alert("failed to Login ")
        }

        //after verify opt working  TO DO
        setOpenOtpDialog(false)

    };
    const resendOTP = async () => {
        const newOtp = generateOtp()
        setOtpValue(newOtp)
        alert(newOtp)
        // const resp = await postData("userinterface/send-otp", { code: newOtp })

        setResend(!resend)


    }
    useEffect(() => {
        if (openOtpDialog) {
            setTimer(60);
            setOtp(["", "", "", ""])
            setError("")
            // Reset timer when dialog opens
            const interval = setInterval(() => {
                setTimer((prev) => (prev > 0 ? prev - 1 : 0));
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [openOtpDialog, resend]);

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
        <Dialog open={openOtpDialog} onClose={() => setOpenOtpDialog(false)} sx={{ width: "100%" }}>
            <DialogContent sx={{ background: "#191919", color: "white", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", width: matches ? "100%" : 600, boxSizing: "border-box" }}>
                <Box display="flex" flexDirection="column" alignItems="center" gap={1} padding={"30px 30px"}>
                    <Close sx={{ color: 'white', cursor: 'pointer', position: "absolute", right: 10, top: 10 }} onClick={() => setOpenOtpDialog(false)} />
                    <Typography variant="h6" fontWeight="bold">VERIFY WITH OTP</Typography>
                    <Typography variant="h7" sx={{ margin: 0 }}>sent to {loginBody?.mobileno || loginBody?.emailid}</Typography>
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
                                    <span style={{ color: "#12da9d", textDecoration: "underline", fontWeight: 600, cursor: "pointer" }} onClick={resendOTP}>Resend OTP</span>
                                </>
                        }
                    </Typography>
                    <Button
                        variant="contained"
                        fullWidth

                        sx={{ marginTop: 3, fontWeight: 600, background: (otp.some((element) => element === "") || timer === 0) ? "#353535" : "#12DAA8", cursor: otp.some((element) => element === "") || timer === 0 ? "not-allowed" : "pointer" }}
                        onClick={handleSubmit}

                    >
                        Verify OTP
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default OTPInput;
