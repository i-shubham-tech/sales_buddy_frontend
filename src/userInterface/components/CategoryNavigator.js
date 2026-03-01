import React from 'react'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function CategoryNavigator() {
    const sm = useMediaQuery('(max-width:500px)');
    return (
        <div style={{display:"flex",alignItems:"center",padding:sm?"16px 2px":"16px 6px",fontWeight:800,fontSize:sm?10:14 }}>
            <span style={{cursor: 'pointer'}}>
                Phone & Wearables
            </span>
            <KeyboardArrowRightIcon />
            <span style={{cursor: 'pointer'}}>
                Mobile Phones
            </span>
            <KeyboardArrowRightIcon />
            <span style={{cursor: 'pointer'}}>
                Android Phones
            </span>
        </div>
    )
}
