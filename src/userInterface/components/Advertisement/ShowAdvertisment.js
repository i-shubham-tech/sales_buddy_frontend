import React, { useEffect, useState } from 'react'
import { postData, serverURL } from '../../../backendservices/FetchNodeServices'
import { Typography } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from 'react-router-dom';

// Component to display single advertisement with description and image
export default function ShowAdvertisment({data}) {
    // Media query breakpoints for responsive design
    const lg = useMediaQuery('(max-width:1290px)');
    const sm = useMediaQuery('(max-width:500px)');
    const navigate=useNavigate()

    return (
        // Main container for advertisement with responsive width and column layout
        <div style={{ width: "94%", marginLeft: "auto", marginRight: "auto", display: "flex", flexDirection: "column", gap: 15 }}>
            
            {/* Advertisement description text with responsive font size */}
            <Typography sx={{  fontSize: sm ? 16 : 29, fontWeight: 600 }} variant="h4" color="inherit" component="div">
                {data?.description}
            </Typography>

            {/* Advertisement image with responsive width and fixed max height */}
            <img src={`${serverURL}/images/${data?.picture}`} width={"100%"} style={{ objectFit: "cover", maxHeight: 300,cursor:"pointer" }} onClick={()=>navigate(`/product/${data.productdetailid}/${data.productid}`)}/>
        </div>
    )
}
