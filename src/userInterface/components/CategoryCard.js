import { Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getData, postData, serverURL } from '../../backendservices/FetchNodeServices';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function CategoryCard({data}) {
    const sm = useMediaQuery('(max-width:600px)');
   
    return (
        // Root container - Wrapper for all category cards with responsive layout
        <div style={{ 
            boxSizing: "border-box",
            display: "flex",
            justifyContent: "space-between",
            marginLeft: "auto",
            marginRight: "auto",
            maxWidth: "1100px",
            padding: "0 10px",
            width: "100%"
        }}>
            {
                // Iterate through category items to create cards
                data?.map((item,i) => {
                    return (
                        // Card container - Individual category item with vertical alignment
                        <div key={i} style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 12,
                            textAlign: "center",
                            cursor:"pointer"
                        }}> 
                            {/* Category icon - Responsive image with max width constraint */}
                            <img 
                                src={`${serverURL}/images/${item.icon}`} 
                                style={{
                                    maxWidth: sm?80:180,
                                    width: "100%"
                                }} 
                            />
                            {/* Category label - Combined service type and name */}
                            <span style={{fontWeight: 800 ,fontSize:sm?12:16}}>
                                {item.servicetype} {item.servicename}
                            </span>
                        </div>
                    )
                })
            }
        </div>
    )
}
