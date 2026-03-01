import { Divider } from '@mui/material'
import React from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'


export default function ProductPrice({ data }) {
    const sm = useMediaQuery('(max-width:450px)');
    const discount=8;
    const save=(parseFloat(data.price)*discount/100).toFixed(2);
    const offerPrice=(parseFloat(data.price)-save).toFixed(2)

    return (
        <div style={{ fontWeight: 600, display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ display: "flex", gap: sm ? 10 : 15, flexWrap: "wrap" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ fontSize: sm ? 14 : 24 }}>
                        &#x20B9;{offerPrice}
                    </span>
                    <span style={{ fontSize: 13, fontWeight: 600 }}>
                        (incl. all Taxes)
                    </span>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <span style={{ width: 8, height: 1, borderBottom: "2px solid gray" }}></span>
                    <span style={{ border: "2px solid gray", padding: 2, fontSize: sm ? 6 : 12, fontWeight: 600 }}>OR</span>
                    <span style={{ width: 8, height: 1, borderBottom: "2px solid gray" }}></span>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <span style={{ fontSize: sm ? 14 : 24, opacity: "1" }}>
                        &#x20B9;3,460/mo*
                    </span>
                    <span style={{ fontSize: 11, textDecoration: "underline", color: "#00e9ba" }}>
                        EMI Options
                    </span>
                </div>

            </div>
            <Divider sx={{ border: "1.5px solid gray", opacity: ".4" }} />
            <span>
                <span style={{
                    textDecoration: "line-through",
                    opacity: ".5",
                    marginRight: 12
                }}>
                    MRP:&#x20B9;{data.price}

                </span>
                <span>(Save  &#x20B9;{save}, {discount}% Off )</span>
            </span>
        </div>
    )
}
