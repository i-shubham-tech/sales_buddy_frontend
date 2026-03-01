import { Button, Divider, Rating, Typography } from '@mui/material'
import React from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'
import { serverURL } from '../../../backendservices/FetchNodeServices';
import { useDispatch } from 'react-redux';


export default function ListCart({ data }) {
    console.log(data?.offerprice)
    const dispatch = useDispatch()
    const lg = useMediaQuery('(max-width:1024px)');
    const handleRemove = (item) => {
        dispatch({type:"DEL_CART",payload:[item.productdetailid]})

    }

    return (
        <div style={{ background: "#FFFFFF", display: "flex", marginTop: "30px", padding: 8, borderRadius: 8, paddingBottom: 70 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img src={`${serverURL}/images/${data.picture}`} style={{ width: 130,height: 130,objectFit:"contain" }} />
            </div>
            <div style={{ paddingTop: 25, paddingLeft: 20, maxWidth: 350, display: "flex", flexDirection: "column", gap: 10 }}>
                <Typography sx={{ fontWeight: 600 }}>
                    {data?.productname}({data?.productram} RAM, {data?.productstorage}, {data?.productcolorname})
                </Typography>
                <Rating readOnly value={data?.ratings} sx={{ fontSize: 16 }} />
                <div>
                    <Typography sx={{ fontSize: 14 }}>Standard Delivery by</Typography>
                    <Typography sx={{ fontSize: 14, }}>2 July 2025 | ₹49</Typography>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                    <Button variant="outlined" sx={{ color: "black", border: "1px solid black", borderRadius: 2, fontSize: 12, fontWeight: 600, opacity: "0.8", paddingX: 5 }}>Move to Wishlist</Button>
                    <Button variant="outlined" sx={{ color: "black", border: "1px solid black", borderRadius: 2, fontSize: 12, fontWeight: 600, opacity: "0.8", paddingX: 5 }} onClick={()=>handleRemove(data)}>Remove</Button>
                </div>
            </div>

            <div style={{ textAlign: "right", flexGrow: 1, paddingTop: 20, paddingRight: 10 }}>
                <Typography sx={{ fontWeight: 700, fontSize: 25 }}>₹{data?.offerprice}</Typography>
                <Typography>(Incl. all Taxes)</Typography>
                <Divider variant="inset" sx={{ background: "black", marginTop: 1, marginLeft: 15 }} />

                <Typography sx={{ fontSize: 16, marginTop: 1, display: "flex", flexDirection: "column" }}>
                    <span style={{ textDecoration: "line-through" }}>MRP  &#x20B9;{data.price}</span>
                    <span style={{ opacity: "0.7", marginLeft: 4 }}>(Save  &#x20B9;{data.price - data.offerprice})</span>
                </Typography>
                <Divider variant="inset" sx={{ background: "black", marginTop: 1, marginLeft: 15 }} />
                <Typography sx={{ fontWeight: 700, fontSize: 20, marginTop: 1 }}>₹6943/mo*</Typography>
                <Typography sx={{ fontSize: 12, color: "#08847A", textDecoration: "underline" }}>EMI Options</Typography>


            </div>


        </div>
    )
}
