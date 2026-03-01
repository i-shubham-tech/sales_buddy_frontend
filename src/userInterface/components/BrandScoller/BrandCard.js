import { Box, Card } from '@mui/material'
import React from 'react'
import { serverURL } from '../../../backendservices/FetchNodeServices'
import { useNavigate } from "react-router-dom"

export default function BrandCard({logo,url,brandid}) {
  const navigate=useNavigate()
    return (
    <div style={{ cursor:"pointer",display: "flex", flexDirection: "column", alignItems: "center",boxSizing: "border-box",width:"100%",padding:4}} onClick={()=>navigate(`/brand/${brandid}`)}>
         <img src={`${serverURL}/images/${logo}`} style={{width:"100%",borderRadius:6}}  />
       </div>
    )
}
