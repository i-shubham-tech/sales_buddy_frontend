import { Button, Divider, Rating, Typography } from '@mui/material'
import React from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'
import { serverURL } from '../../../backendservices/FetchNodeServices';
import { useDispatch } from 'react-redux';


export default function MobileListCart({ data }) {
    const dispatch = useDispatch()
    const sm = useMediaQuery('(max-width:450px)');
    const handleRemove = (item) => {
        dispatch({ type: "DEL_CART", payload: [item.productdetailid] })

    }

    return (
        <div style={{ background: "#FFFFFF", display: "flex", marginTop: "30px", gap: 20, padding: 8, borderRadius: 8, paddingBottom: 10, justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img src={`${serverURL}/images/${data.picture}`} style={{ width: 120 }} />
            </div>
            <div style={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 5, maxWidth: 250 }}>
                    <Typography sx={{ fontWeight: 600, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
                        {data.productname}({data.productram} RAM, {data.productstorage}, {data.productcolorname})
                    </Typography>

                    <Rating readOnly value={data.ratings} sx={{ fontSize: 16 }} />


                    <div style={{ display: "flex", gap: sm ? 10 : 15, flexWrap: "wrap" }}>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <span style={{ fontSize: sm ? 10 : 14 }}>
                                &#x20B9;{data?.offerprice?.toFixed(2)}
                            </span>
                            <span style={{ fontSize: 9, fontWeight: 600 }}>
                                (incl. all Taxes)
                            </span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <span style={{ width: 8, height: 1, borderBottom: "2px solid gray" }}></span>
                            <span style={{ border: "2px solid gray", padding: 2, fontSize: sm ? 6 : 8, fontWeight: 600 }}>OR</span>
                            <span style={{ width: 8, height: 1, borderBottom: "2px solid gray" }}></span>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <span style={{ fontSize: sm ? 10 : 14, opacity: "1" }}>
                                &#x20B9;3,460/mo*
                            </span>
                            <span style={{ fontSize: 11, textDecoration: "underline", color: "#00e9ba" }}>
                                EMI Options
                            </span>
                        </div>

                    </div>

                    <Typography sx={{ fontSize: 10 }}>
                        <span style={{ textDecoration: "line-through" }}>MRP  &#x20B9;{data.price.toFixed(2)}</span>
                        <span style={{ opacity: "0.7", marginLeft: 4 }}>(Save  &#x20B9;{data.price - data.offerprice})</span>
                    </Typography>

                    <Typography sx={{ fontSize: 10 }}>Standard Delivery by 2 July 2025 | ₹49</Typography>

                    <div style={{ display: "flex", gap: sm ? 4 : 10, marginTop: 8 }}>
                        <Button variant="outlined" sx={{ padding: 1, color: "black", border: "1px solid black", borderRadius: 2, fontSize: sm ? 8 : 10, fontWeight: 600, opacity: "0.8" }}>Move to Wishlist</Button>
                        <Button variant="outlined" sx={{ padding: 1, color: "black", border: "1px solid black", borderRadius: 2, fontSize: sm ? 8 : 10, fontWeight: 600, opacity: "0.8" }} onClick={() => handleRemove(data)}>Remove</Button>
                    </div>

                    {/* <div>
                    <Typography sx={{ fontSize: 14 }}>Standard Delivery by</Typography>
                    <Typography sx={{ fontSize: 14, }}>2 July 2025 | ₹49</Typography>
                </div>
                 */}
                </div>
            </div>



        </div>
    )
}
