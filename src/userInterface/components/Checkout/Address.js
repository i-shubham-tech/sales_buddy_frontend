import React, { useImperativeHandle, useState } from 'react'
import { Typography, TextField, Button, Grid2 } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useSelector } from 'react-redux';
import { postData } from '../../../backendservices/FetchNodeServices';
export default function Address({ ref }) {
    const user = Object.values(useSelector((state) => state.user))[0];
    const matches = useMediaQuery('(max-width:780px)')
    const [addressNickname, setAddressNickname] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [area, setArea] = useState('');
    const [address, setAddress] = useState('');
    const [pincode, setPincode] = useState('');
    const [landmark, setLandmark] = useState('');
    const [addressType, setAddressType] = useState("")
    const [error, setError] = useState({})

    const errorHandling = (field, message) => {
        setError(prev => ({
            ...prev,
            [field]: message
        }))
    }

    const handleValidation = () => {
        let error = false

        if (state.length == 0) {
            errorHandling("state", "State is required")
            error = true
        }

        if (city.length == 0) {
            errorHandling("city", "City is required")
            error = true
        }

        if (address.length == 0) {
            errorHandling("address", "Address is required")
            error = true
        }

        if (pincode.length == 0) {
            errorHandling("pincode", "Pincode is required")
            error = true
        }
        if (area.length == 0) {
            errorHandling("area", "Locality/Sector/Area is required")
            error = true
        }

        if (addressNickname.length == 0) {
            errorHandling("addressNickname", "Address Nickname is required")
            error = true
        }
        return error
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
    const handleSubmit = async () => {
       
        const isError = handleValidation()
        
        if (isError) return
        const body = {
            "mobileno": user?.mobileno,
            "addressNickname": addressNickname,
            "state": state,
            "city": city,
            "area": area,
            "address": address,
            "pincode": pincode,
            "landmark": landmark,
            "addressType": addressType
        }

        var response = await postData('userinterface/userinterface_add_address', body)
        if (response?.status) {
            return true
        } else {
            alert(false)
            return false
        }
    }

    useImperativeHandle(ref, () => ({
        handleSubmit,
    }));

    return (
        <div style={{ background: "#FFFFFF", padding: "10px 25px", boxSizing: "border-box" }}>
            <Typography sx={{ fontWeight: "bold", marginTop: 3 }}>Address information</Typography>
            <div style={{ marginTop: 10 }}>
                <Grid2 container spacing={2}>

                    <Grid2 item size={matches ? 12 : 6}>
                        <Typography sx={{ marginBottom: 1 }}>Address Nickname*</Typography>
                        <TextField
                            fullWidth
                            placeholder='Enter a nickname for this address'
                            sx={textFieldStyle}
                            value={addressNickname}
                            error={error.addressNickname}
                            helperText={error.addressNickname}
                            onFocus={() => errorHandling("addressNickname", "")}
                            onChange={(e) => setAddressNickname(e.target.value)}
                        />
                    </Grid2>


                    <Grid2 item size={matches ? 12 : 6}>
                        <Typography sx={{ marginBottom: 1 }}>Pin Code*</Typography>
                        <TextField
                            fullWidth
                            placeholder='Pin Code'
                            value={pincode}
                            error={error.pincode}
                            helperText={error.pincode}
                            onFocus={() => errorHandling("pincode", "")}
                            onChange={(e) => setPincode(e.target.value)}
                            sx={textFieldStyle} />
                    </Grid2>
                    <Grid2 item size={matches ? 12 : 6}>
                        <Typography sx={{ marginBottom: 1 }}>Locality / Sector / Area**</Typography>
                        <TextField
                            fullWidth
                            placeholder='Locality / Sector / Area*'
                            sx={textFieldStyle}
                            value={area}
                            error={error.area}
                            helperText={error.area}
                            onFocus={() => errorHandling("area", "")}
                            onChange={(e) => setArea(e.target.value)}
                        />
                    </Grid2>


                    <Grid2 item size={matches ? 12 : 6}>
                        <Typography sx={{ marginBottom: 1 }}>Landmark</Typography>
                        <TextField
                            fullWidth
                            placeholder='Landmark'
                            value={landmark}
                            onChange={(e) => setLandmark(e.target.value)}
                            sx={textFieldStyle} />
                    </Grid2>

                    <Grid2 item size={12}>
                        <Typography sx={{ marginBottom: 1 }}>Address(Flat no.,Building,Company,Street)*</Typography>
                        <TextField
                            fullWidth
                            placeholder='Flat no/Building Name/Society'
                            value={address}
                            error={error.address}
                            helperText={error.address}
                            onFocus={() => errorHandling("address", "")}
                            onChange={(e) => setAddress(e.target.value)}
                            sx={textFieldStyle} />
                    </Grid2>


                    <Grid2 item size={matches ? 12 : 6}>
                        <Typography sx={{ marginBottom: 1 }}>State*</Typography>
                        <TextField
                            fullWidth
                            placeholder='State'
                            sx={textFieldStyle}
                            value={state}
                            error={error.state}
                            helperText={error.state}
                            onFocus={() => errorHandling("state", "")}
                            onChange={(e) => setState(e.target.value)}
                        />
                    </Grid2>

                    {/* City Name */}
                    <Grid2 item size={matches ? 12 : 6}>
                        <Typography sx={{ marginBottom: 1 }}>City*</Typography>
                        <TextField
                            fullWidth
                            placeholder='City'
                            sx={textFieldStyle}
                            value={city}
                            error={error.city}
                            helperText={error.city}
                            onFocus={() => errorHandling("city", "")}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </Grid2>

                    {/* Address Name */}




                    {/* Pin Code */}

                    <Grid2 item size={12}>
                        <Typography sx={{ marginBottom: 1 }}>Address Type</Typography>
                        <div style={{ display: "flex", gap: 5 }}>
                            <Button variant='outlined' sx={{ border: addressType == "Home" ? "2px solid #12DAA8" : "1px solid black", color: "black" }} onClick={() => setAddressType("Home")}>Home</Button>
                            <Button variant='outlined' sx={{ border: addressType == "Work" ? "2px solid #12DAA8" : "1px solid black", color: "black" }} onClick={() => setAddressType("Work")}>Work</Button>
                            <Button variant='outlined' sx={{ border: addressType == "Other" ? "2px solid #12DAA8" : "1px solid black", color: "black" }} onClick={() => setAddressType("Other")}>Other</Button>
                        </div>
                    </Grid2>

                </Grid2>


            </div>
        </div>
    )
}
