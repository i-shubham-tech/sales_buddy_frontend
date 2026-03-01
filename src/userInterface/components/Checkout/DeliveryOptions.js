import { Divider, Typography } from '@mui/material'
import React from 'react'
import { serverURL } from '../../../backendservices/FetchNodeServices'
import { RadioButtonChecked } from '@mui/icons-material'

export default function DeliveryOptions({productData}) {
    return (
        <div>
            <Typography sx={{paddingLeft:2,fontWeight:"bold"}}>Delivery Options</Typography>
            <div style={{display:"flex",flexDirection:"column",gap:15,marginTop:10}}>
                {productData?.map((item) => {
                    return (
                        <div style={{display:"flex",background:"#FFFFFF",padding:25,alignItems:"center"}}>
                            <div>
                                <img src={`${serverURL}/images/${item.picture}`} style={{width:100,height:100,objectFit:"contain"}} />
                            </div>
                            <div style={{ flex: 1,paddingLeft:17,display:"flex",flexDirection:"column",gap:12 }}>
                                <Typography sx={{fontWeight:"bold"}}>{item.productname} ({item.productram} RAM, {item.productstorage}, {item.productcolorname})</Typography>
                                <Divider sx={{ background: "black" }} />
                                <div style={{display:"flex",alignItems:"center"}}>
                                    <RadioButtonChecked sx={{color:"#12daa8"}}/>
                                    <Typography sx={{marginLeft:1}}>Standard Delivery by 19 July 2025 | Free</Typography>
                                </div>

                            </div>
                        </div>
                    )

                })}
            </div>

        </div>
    )
}
