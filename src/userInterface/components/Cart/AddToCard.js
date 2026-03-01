import { Button, Grid2 } from '@mui/material'
import React, { useEffect, useState } from 'react'
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';



export default function AddToCard({ productdetailid, onChange }) {
    const [value, setValue] = useState(0)
    const cart = useSelector(state => (state.cart))
    const cartKeys = Object.keys(cart)
    const navigate = useNavigate()

    const isCart = value > 0 ? true : false
    const handleCartChange = (op) => {
        if (op == "+") {
            if (value == 5) {
                return
            }
            let x = value + 1
            setValue(x)
            onChange(x)



        }
        else if (op == "-") {
            if (value == 0) {
                return
            }

            let x = value - 1
            setValue(x)
            onChange(x)

        }
        else {

            setValue(1)
            onChange(1)

        }

    }
    useEffect(() => {
        if (cartKeys.includes(productdetailid)) {
            setValue(cart[productdetailid].quantity)
        }
        else {
            setValue(0)
        }
    })

    return (
        <div style={{ display: "flex", justifyContent: "space-evenly", marginTop: 20 }}>
            <Button sx={{ width: "100%", maxWidth: 140, background: "#12DAA8", color: "black", fontWeight: 700, fontSize: 12 }} variant='contained' onClick={() => navigate(`/checkout/${productdetailid}`)}>Buy</Button>
            {
                isCart ? <div
                    style={{
                        width: "100%",
                        maxWidth: 140,
                        background: "transparent",
                        border: "1px solid white",
                        fontSize: 12,
                        fontWeight: 700,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 20,
                        boxSizing: "border-box",
                        padding: "5px 0px"

                    }}>
                    <span style={{
                        border: "2px soild red",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <RemoveIcon
                            onClick={() => handleCartChange("-")}
                            sx={{ fontSize: 16, border: "2px solid white", borderRadius: "100%", cursor: "pointer" }} />
                    </span>

                    <span style={{ fontSize: 16, fontWeight: 700, width: "12px", display: "flex", justifyContent: "center" }}>{value}</span>
                    <span style={{
                        border: "2px soild red",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <AddIcon
                            onClick={() => handleCartChange("+")}
                            sx={{ fontSize: 16, border: "2px solid white", borderRadius: "100%", cursor: "pointer" }} />
                    </span>

                </div>
                    :
                    <Button
                        sx={{
                            width: "100%",
                            maxWidth: 140,
                            background: "transparent",
                            border: "1px solid white",
                            fontSize: 12,
                            fontWeight: 700
                        }}
                        variant='contained'
                        onClick={() => handleCartChange("No Op")}

                    >Add to card</Button>

            }
        </div>
    )
}
