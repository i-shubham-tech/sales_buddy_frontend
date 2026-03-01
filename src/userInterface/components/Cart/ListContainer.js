import ListCart from './ListCart'
import { Button, Divider, Rating, Typography } from '@mui/material'
import React from 'react'
import PercentIcon from '@mui/icons-material/Percent';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import useMediaQuery from '@mui/material/useMediaQuery'
import MobileListCart from './MobileListCart';

export default function ListContainer({ productData }) {
    const lg = useMediaQuery('(max-width:1024px)');
    const md = useMediaQuery('(max-width:780px)');

    return (
        <div style={{ maxWidth: lg ? "100%" : 850, width: "100%", display: "flex", flexDirection: "column" }}>
            <div style={{ background: "#FFFFFF", display: "flex", alignItems: "center", padding: "18px 30px", position: "relative" }}>
                <div style={{ border: "2px solid black", borderRadius: "100%", width: 20, display: "flex", alignItems: "center", justifyContent: "center", padding: 3 }}>
                    <PercentIcon sx={{ fontSize: 14 }} />
                </div>
                <Typography sx={{ fontSize: 20, fontWeight: 700, marginLeft: 2 }}>Apply Coupon</Typography>
                <ChevronRightIcon sx={{ position: "absolute", right: 25 }} />
            </div>
            <div style={{ marginTop: 5 }}>
                {
                    productData?.map((item) => {
                        return (
                            md ? <MobileListCart data={item} /> : <ListCart data={item}/>


                        )
                    })
                }

            </div>
        </div>
    )
}
