import { Grid2, Typography } from '@mui/material'
import React from 'react'
import FourAdCard from './FourAdCard'
import useMediaQuery from '@mui/material/useMediaQuery';


export default function FourAds() {
    const md = useMediaQuery('(max-width:900px)');
    const sm = useMediaQuery('(max-width:500px)');
    const dealOfDayArray = [
        {
            brandName: 'Samsung',
            productName: 'Galaxy S25 Ultra',
            productdetailid: 32,
            productid: 19,
            price: 70999,
            picture: "/Samsung.webp"
        },
        {
            brandName: 'OnePlus',
            productName: 'OnePlus 13S 5G',
            productdetailid: 28,
            productid: 20,
            price: 49999,
            picture: "/OnePlus.webp"
        },
        {
            brandName: 'Xiaomi',
            productName: 'Xiaomi 14 CIVI 5G',
            productdetailid: 20,
            productid: 5,
            price: 42999,
            picture: "/Xiaomi.webp"
        },
        {
            brandName: 'Apple ',
            productName: 'iPhone 17 Pro',
            productdetailid: 31,
            productid: 23,
            price: 132900,
            picture: "/apple.webp"
        }
    ]

    return (
        <div style={{}}>
            <Typography sx={{ paddingX: sm ? 2 : 5, fontSize: sm ? 16 : 28, fontWeight: 550, marginBottom: 2 }}>Deals of the Day</Typography>
            <Grid2 container spacing={2} sx={{ display: "flex", paddingX: sm ? 1 : 3 }}>
                {dealOfDayArray.map((item, index) => {
                    return (
                        <Grid2 size={md ? 6 : 3} key={index}>
                            <FourAdCard data={item}/>
                        </Grid2>
                    )
                })}
            </Grid2>
        </div>
    )
}
