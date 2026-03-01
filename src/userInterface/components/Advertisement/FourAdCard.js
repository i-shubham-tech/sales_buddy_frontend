import React from 'react'
import { Divider } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from 'react-router-dom';


export default function FourAdCard({data}) {
    const md = useMediaQuery('(max-width:900px)');
    const sm = useMediaQuery('(max-width:500px)');
    const navigate=useNavigate()



    return (
        <div style={{
            background: "#020024",
            background: "linear-gradient(169deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)",
            padding: "20px 15px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
            maxWidth: "290px",
            maxHeight: "300px",
            marginLeft: "7.5px",
            marginRight: "3px",
            boxSizing: "border-box",
            borderRadius: 8,
            fontWeight: 700,
            fontSize: 20,
            gap: 10,
            cursor:"pointer"


        }} onClick={()=>navigate(`/product/${data.productdetailid}/${data.productid}`)}>
            <div style={{ fontSize: sm ? 14 : 18 }}>{data.brandName}</div>
            <div style={{ fontSize: sm ? 14 : 18 }}>{data.productName}</div>
            <img src={data.picture} style={{ maxWidth: sm ? 90 : 150, width: "100%",maxHeight:140,objectFit:"contain" }} />
            <Divider variant="middle" orientation="horizontal" sx={{ border: "1px solid white", width: "80%" }} />
            <div style={{
                fontWeight: 300,
                fontSize: 18
            }}>
                <span style={{ fontSize: sm ? 12 : 18 }}>Starting at</span>
                <span style={{ fontWeight: 700, fontSize: sm ? 14 : 20 }}>
                    &#8377;{data.price.toFixed(2)}
                </span>
            </div>

        </div>
    )
}
