
import React, { useState } from 'react'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import useMediaQuery from '@mui/material/useMediaQuery'


export default function ScrollerBackArrow({ sliderRef }) {
    const matches = useMediaQuery('(max-width:780px)');

    const [sliderArrow, setSliderArrow] = useState(".6")
    return (
        <div
            onClick={() => sliderRef.current.slickPrev()}
            onMouseOver={() => setSliderArrow("1")}
            onMouseLeave={() => setSliderArrow(".6")}
            style={{
                color: "white",
                display: matches ? "none" : "flex",
                alignItems: "center",
                justifyContent: 'end',
                paddingRight:4,
                cursor: 'pointer',
                boxSizing:"border-box"
              
                
            }}>
            <ArrowBackIosNewIcon style={{ fontSize: "22px", opacity:sliderArrow }} />
        </div>
    )
}
