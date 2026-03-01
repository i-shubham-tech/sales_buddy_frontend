import { Button, Typography } from '@mui/material'
import React from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useLocation, useNavigate } from "react-router-dom"





export default function OrderSummary({ productData, onPaymentClick, setNetAmount }) {
    console.log(productData)
    const navigate = useNavigate()
    const location = useLocation()
    const isCart = location.pathname.includes("/cart")
    const lg = useMediaQuery('(max-width:1024px)');
    const OriginalPrice = productData.reduce((p1, p2) => {
        let total = p2.price * p2.quantity
        return p1 + total


    }, 0)
    console.log("op",OriginalPrice)
    const totalOfferPrice = productData.reduce((p1, p2) => {
        let total = p2.offerprice * p2.quantity
        return p1 + total


    }, 0)
    

    const saving = OriginalPrice - totalOfferPrice
    const netAmount = OriginalPrice - saving

    setNetAmount(netAmount)
    return (
        <div style={{ maxWidth: "100%", background: "#FFFFFF", borderRadius: 8, display: "flex", flexDirection: "column", flexDirection: "column", gap: 10, padding: 20, maxHeight: 200, position: "sticky", alignSelf: "self-start", top: 130 }}>

            <Typography sx={{ fontWeight: 700, fontSize: 18 }}>Order Summary ( {productData.length} items )</Typography>
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


            <Button variant="contained" sx={{ background: "#12DAA8", color: "black", fontWeight: 600, fontSize: 12 }} onClick={onPaymentClick}>Proceed To Payment</Button>

        </div>
    )
}
