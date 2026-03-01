import React, { useEffect, useState } from 'react'
import { postData, serverURL } from '../../../backendservices/FetchNodeServices'
import { Grid2, Typography } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from 'react-router-dom';

export default function ShowMultipleAds({ data }) {
    const lg = useMediaQuery('(max-width:1290px)');
    const sm = useMediaQuery('(max-width:500px)');
    const image = data?.picture.split(",")
    const navigate = useNavigate()
   

    return (
        <div style={{ width: "94%", marginLeft: "auto", marginRight: "auto", display: "flex", flexDirection: "column", gap: 10 }}>

            <Typography sx={{ paddingLeft: sm ? 2 : 5, fontSize: sm ? 16 : 29, fontWeight: 600, paddingLeft: 1 }} variant="h4" color="inherit" component="div">
                {data?.description}
            </Typography>



            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                {
                    image?.map((item, i) => {
                        return (
                            <div key={i} style={{ padding: 8 ,cursor:"pointer"}} onClick={()=>navigate(`/product/${data.productdetailid}/${data.productid}`)}>
                                <img src={`${serverURL}/images/${item}`} style={{ objectFit: "cover", width: "100%", maxWidth: 600, maxHeight: 400 }}  />
                            </div>
                        )
                    })
                }
            </div>

        </div >
    )
}
