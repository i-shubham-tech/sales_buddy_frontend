import { Edit } from '@mui/icons-material';
import { Button, Dialog, DialogContent, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material'
import { FormControl, Grid2, MenuItem, Select, TextField } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import React, { useState, useImperativeHandle } from 'react';
import { Close } from '@mui/icons-material';
import OTPInput from './OTPInput';
import { useSelector } from 'react-redux';
import { postData } from '../../../backendservices/FetchNodeServices';

export default function PersonalInformation({ ref }) {

    const user = Object.values(useSelector((state) => state.user))[0];
    console.log(user)
    const matches = useMediaQuery('(max-width:780px)');
    const sm = useMediaQuery('(max-width:420px)');
    const [title, setTitle] = useState('');
    const [firstName, setFirstName] = useState(user?.username || '');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState(user?.gender || '');
    const [email, setEmail] = useState(user?.emailid || '');
    const [mobileNumber, setMobileNumber] = useState(user?.mobileno || '');
    const [error, setError] = useState({})
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogState, setDialogState] = useState("");
    const [otpDialog, setOtpDialog] = useState(false);
    const [dialogValue, setDialogValue] = useState('')

    const errorHandling = (field, value) => {
        setError(prev => ({ ...prev, [field]: value }))
    }

    const handleValidation = () => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        const mobileRegex = /^[0-9]{10}$/;
        let error = false

        if (firstName.length == 0) {
            errorHandling("firstName", "First Name is required")
            error = true
        }

        if (lastName.length == 0) {
            errorHandling("lastName", "Last Name is required")
            error = true
        }

        if (email.length == 0) {
            errorHandling("email", "Email is required")
            error = true
        } else if (!emailRegex.test(email)) {
            errorHandling("email", "Enter Valid Email")
            error = true
        }

        if (mobileNumber.length == 0) {
            errorHandling("mobileNumber", "Mobile Number is required")
            error = true
        } else if (!mobileRegex.test(mobileNumber)) {
            errorHandling("mobileNumber", "Enter Valid Mobile Number")
            error = true
        }

        return error
    }

    const handleSubmit = async () => {
        const error = handleValidation()
        
        if (error) return

        
        const body = {
            "mobileno": mobileNumber,
            "emailid": email,
            "gender": gender,
            "username": `${title} ${firstName} ${middleName} ${lastName}`,
        }

        var response = await postData('userinterface/userinterface_submit_personalinfo', body)
        if (response.status) {
            return true
        } else {
            alert(false)
            return false
        }
    }

    useImperativeHandle(ref, () => ({
        handleSubmit,
    }));

    const handleDialogOtp = async () => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        const mobileRegex = /^[0-9]{10}$/;

        if (dialogState == "email") {
            if (dialogValue.length == 0) {
                errorHandling("email", "Email is required")
                return
            } else if (!emailRegex.test(dialogValue)) {
                errorHandling("email", "Enter Valid Email")
                return
            } else if (email == dialogValue) {
                errorHandling("email", "Your email already in current account")
                return
            }
        } else {
            if (dialogValue.length == 0) {
                errorHandling("mobileNumber", "Mobile Number is required")
                return
            } else if (!mobileRegex.test(dialogValue)) {
                errorHandling("mobileNumber", "Enter Valid Mobile Number")
                return
            } else if (mobileNumber == dialogValue) {
                errorHandling("mobileNumber", "Your mobile number already in current account")
                return
            }
        }

        setOpenDialog(false)
        setOtpDialog(true)
    }

    const DialogBoxOpen = (state) => {
        setDialogValue("")
        setOpenDialog(true)
        setDialogState(state)
    }

    const DialogBox = () => {
        return (
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogContent sx={{ background: "#191919", color: "white" }}>
                    {dialogState == "email" ?
                        <div style={{ background: "#191919", minWidth: sm ? "" : matches ? 300 : 500, width: "100%", height: "100%", position: "relative", display: "flex", flexDirection: "column", gap: 20 }}>
                            <Close sx={{ position: "absolute", right: 0, cursor: 'pointer' }} onClick={() => setOpenDialog(false)} />
                            <Typography sx={{ fontWeight: 800, marginBottom: 1 }}> Email ID</Typography>
                            <TextField
                                fullWidth
                                placeholder='Enter your email id'
                                sx={textFieldStyle}
                                error={error.email}
                                onFocus={() => errorHandling("email", "")}
                                helperText={error.email}
                                onChange={(e) => setDialogValue(e.target.value)} />
                            <div style={{ display: "flex", justifyContent: "center", width: "100%", margin: "auto" }}>
                                <Button variant='contained' fullWidth sx={{ background: "#353535", fontWeight: "bold", maxWidth: 200 }} onClick={handleDialogOtp}>Send Otp</Button>
                            </div>
                        </div>
                        :
                        <div style={{ background: "#191919", minWidth: sm ? "" : matches ? 300 : 500, width: "100%", height: "100%", position: "relative", display: "flex", flexDirection: "column", gap: 20 }}>
                            <Close sx={{ position: "absolute", right: 0, cursor: 'pointer' }} onClick={() => setOpenDialog(false)} />
                            <Typography sx={{ fontWeight: 800 }}>Mobile Number</Typography>
                            <TextField
                                fullWidth
                                placeholder='Enter your mobile number'
                                error={error.mobileNumber}
                                onFocus={() => errorHandling("mobileNumber", "")}
                                helperText={error.mobileNumber}
                                sx={textFieldStyle}
                                onChange={(e) => setDialogValue(e.target.value)} />
                            <div style={{ display: "flex", justifyContent: "center", marginTop: 6, width: "100%", margin: "auto" }}>
                                <Button variant='contained' fullWidth sx={{ background: "#353535", fontWeight: "bold", maxWidth: 200 }} onClick={handleDialogOtp}>Send Otp</Button>
                            </div>
                        </div>
                    }
                </DialogContent>
            </Dialog>
        )
    }

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
        <div style={{ background: "#FFFFFF", padding: "10px 25px", boxSizing: "border-box" }}>
            <Typography sx={{ fontWeight: "bold" }}>Contact information</Typography>
            <div style={{ marginTop: 5 }}>
                <Grid2 container spacing={2}>
                    <Grid2 item size={matches ? 12 : 6}>
                        <Typography sx={{ marginBottom: 1 }}>Title</Typography>
                        <FormControl fullWidth>
                            <Select
                                labelId='select-title-label'
                                variant="outlined"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                sx={{
                                    color: 'black',
                                    background: '#F6F6F6',
                                    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
                                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: 'white' },
                                    '& svg': { color: 'black' },
                                }}
                                MenuProps={{
                                    PaperProps: {
                                        sx: {
                                            backgroundColor: 'white',
                                            color: 'black',
                                        },
                                    },
                                }}
                            >
                                <MenuItem value="Mr" sx={{ '&:hover': { backgroundColor: '#F6F6F6' } }}>Mr</MenuItem>
                                <MenuItem value="Mrs" sx={{ '&:hover': { backgroundColor: '#F6F6F6' } }}>Mrs</MenuItem>
                                <MenuItem value="Miss" sx={{ '&:hover': { backgroundColor: '#F6F6F6' } }}>Miss</MenuItem>
                                <MenuItem value="Ms" sx={{ '&:hover': { backgroundColor: '#F6F6F6' } }}>Ms</MenuItem>
                                <MenuItem value="Dr" sx={{ '&:hover': { backgroundColor: '#F6F6F6' } }}>Dr</MenuItem>
                                <MenuItem value="Prof" sx={{ '&:hover': { backgroundColor: '#F6F6F6' } }}>Prof</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid2>

                    <Grid2 item size={matches ? 12 : 6}>
                        <Typography sx={{ marginBottom: 1 }}>First Name*</Typography>
                        <TextField
                            fullWidth
                            placeholder='Name'
                            sx={textFieldStyle}
                            value={firstName}
                            onFocus={() => errorHandling("firstName", "")}
                            onChange={(e) => setFirstName(e.target.value)}
                            error={error.firstName}
                            helperText={error.firstName}
                        />
                    </Grid2>

                    <Grid2 item size={matches ? 12 : 6}>
                        <Typography sx={{ marginBottom: 1 }}>Middle Name</Typography>
                        <TextField
                            fullWidth
                            placeholder='Middle Name'
                            value={middleName}
                            onChange={(e) => setMiddleName(e.target.value)}
                            sx={textFieldStyle} />
                    </Grid2>

                    <Grid2 item size={matches ? 12 : 6}>
                        <Typography sx={{ marginBottom: 1 }}>Last Name*</Typography>
                        <TextField
                            fullWidth
                            placeholder='Last Name'
                            value={lastName}
                            error={error.lastName}
                            helperText={error.lastName}
                            onFocus={() => errorHandling("lastName", "")}
                            onChange={(e) => setLastName(e.target.value)}
                            sx={textFieldStyle} />
                    </Grid2>

                    <Grid2 item size={12}>
                        <Typography sx={{ marginBottom: 1 }}>Gender</Typography>
                        <RadioGroup
                            row
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            sx={{ gap: 2 }}
                        >
                            <FormControlLabel value="male" control={<Radio sx={{ '&.Mui-checked': { color: "#12daa8" } }} />} label="Male" />
                            <FormControlLabel value="female" control={<Radio sx={{ '&.Mui-checked': { color: "#12daa8" } }} />} label="Female" />
                            <FormControlLabel value="transgender" control={<Radio sx={{ '&.Mui-checked': { color: "#12daa8" } }} />} label="Transgender" />
                            <FormControlLabel value="prefer_not_to_say" control={<Radio sx={{ '&.Mui-checked': { color: "#12daa8" } }} />} label="Prefer not to say" />
                        </RadioGroup>
                    </Grid2>

                    <Grid2 position={"relative"} item size={matches ? 12 : 6}>
                        <Edit sx={{
                            position: 'absolute',
                            right: 10,
                            top: 45,
                            zIndex: 2,
                            color: "black",
                            cursor: "pointer"
                        }} onClick={() => DialogBoxOpen("mobile")} />
                        <Typography sx={{ marginBottom: 1 }}>Mobile Number*</Typography>
                        <Typography sx={{ background: "#F6F6F6", padding: 2, borderRadius: 2, border: error.mobileNumber ? "1px solid #DB2F2F" : "none" }}>
                            {mobileNumber ? <span>{mobileNumber}</span> : <span style={{ color: "#909090" }}>Mobile Number</span>}
                        </Typography>
                        <Typography sx={{ fontSize: 12, paddingLeft: 2, color: "#DB2F2F", marginTop: "5px" }}>{error.mobileNumber}</Typography>
                    </Grid2>

                    <Grid2 item size={matches ? 12 : 6} position={"relative"}>
                        <Edit sx={{
                            position: 'absolute',
                            right: 10,
                            top: 45,
                            zIndex: 2,
                            color: "black",
                            cursor: "pointer"
                        }} onClick={() => DialogBoxOpen("email")} />
                        <Typography sx={{ marginBottom: 1 }}>Email*</Typography>
                        <Typography sx={{ background: "#F6F6F6", padding: 2, borderRadius: 2, border: error.email ? "1px solid #DB2F2F" : "none" }}>
                            {email ? <span>{email}</span> : <span style={{ color: "#909090" }}>Email</span>}
                        </Typography>
                        <Typography sx={{ fontSize: 12, paddingLeft: 2, color: "#DB2F2F", marginTop: "5px" }}>{error.email}</Typography>
                    </Grid2>
                </Grid2>
                {DialogBox()}
                <OTPInput
                    otpDialog={otpDialog}
                    setOtpDialog={setOtpDialog}
                    value={dialogValue}
                    setField={dialogState == "email" ? setEmail : setMobileNumber}
                />
            </div>
        </div>
    )
}
