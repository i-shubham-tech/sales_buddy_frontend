
import React, { useState } from 'react'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import useMediaQuery from '@mui/material/useMediaQuery'


export default function ScrollerForwardArrow({ sliderRef }) {
    const matches = useMediaQuery('(max-width:780px)');
    const [sliderArrow, setSliderArrow] = useState(".6")
    return (
        <div
            onClick={() => sliderRef.current.slickNext()}
            onMouseOver={() => setSliderArrow("1")}
            onMouseLeave={() => setSliderArrow(".6")}
            style={{
                color: "white",
                display: matches ? "none" : "flex",
                justifyContent: 'start',
                paddingLeft: 4,
                cursor: 'pointer',
                boxSizing:"border-box"
               
    
            }}>
            <ArrowForwardIosIcon style={{ fontSize: "22px", opacity: sliderArrow }} />
        </div>
    )
}
