import { Button, Divider, Rating, Typography } from '@mui/material'
import React from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useLocation, useNavigate } from "react-router-dom"
import Login from '../UserInteraction/Login'
import OTPInput from '../UserInteraction/OTPInput'
import { useSelector } from 'react-redux'




export default function OrderSummary({ productData }) {
    const [openLoginDialog, setOpenLoginDialog] = React.useState(false)
    const [openOtpDialog, setOpenOtpDialog] = React.useState(false)
    const [loginBody, setLoginBody] = React.useState({})
    const [otpValue, setOtpValue] = React.useState("")
    const user = Object.values(useSelector((state) => state.user));
    const navigate = useNavigate()
    const lg = useMediaQuery('(max-width:1024px)');
    const OriginalPrice = productData.reduce((p1, p2) => {
        let total = p2.price * p2.quantity
        return p1 + total


    }, 0)
    const totalOfferPrice = productData.reduce((p1, p2) => {
        let total = p2.offerprice * p2.quantity
        return p1 + total


    }, 0)

    const saving = OriginalPrice - totalOfferPrice
    const netAmount = OriginalPrice - saving

    const handleCheckout = () => {
        if (user.length == 0) {
            setOpenLoginDialog(true)
        }
        else {
            navigate("/checkout")
        }
    }

    return (
        <div style={{ maxWidth: "100%", background: "#FFFFFF", borderRadius: 8, display: "flex", flexDirection: "column", flexDirection: "column", gap: 10, padding: 20, maxHeight: 200, position: "sticky", alignSelf: "self-start", top: 130 }}>
            <Login openLoginDialog={openLoginDialog} setOpenLoginDialog={setOpenLoginDialog} setOpenOtpDialog={setOpenOtpDialog} loginBody={loginBody} setLoginBody={setLoginBody} otpValue={otpValue} setOtpValue={setOtpValue} />
            <OTPInput status={"cart"} openOtpDialog={openOtpDialog} setOpenOtpDialog={setOpenOtpDialog} loginBody={loginBody} generatedOTP={otpValue} setOtpValue={setOtpValue} />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Typography>Original Price</Typography>
                <Typography>₹{OriginalPrice.toFixed(2)}</Typography>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Typography>Saving</Typography>
                <Typography>₹{saving.toFixed(2)}</Typography>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Typography>Total</Typography>
                <Typography>₹{netAmount.toFixed(2)}</Typography>
            </div>
            <Button variant="contained" sx={{ background: "#12DAA8", color: "black", fontWeight: 600, fontSize: 12 }} onClick={handleCheckout}>Checkout</Button>
        </div>
    )
}
