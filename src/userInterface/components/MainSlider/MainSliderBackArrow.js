import React, { useState } from 'react'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import useMediaQuery from '@mui/material/useMediaQuery'


export default function MainSliderBackArrow({sliderRef,size}) {
    const matches = useMediaQuery('(max-width:780px)');

    const [sliderArrow, setSliderArrow] = useState("rgba(37, 37, 37, 0.3)")
    return (
        <div onClick={() => sliderRef.current.slickPrev()}  onMouseOver={() => setSliderArrow("rgba(37, 37, 37,0.6)")} onMouseLeave={() => setSliderArrow("rgba(37, 37, 37, 0.3)")}  style={{ position: "absolute",zIndex:1, color: "white", top: "47%", left: "0", height: "60px", width: "52px", background: sliderArrow, display: matches ? "none" : "flex", alignItems: "center", justifyContent: 'center', borderTopRightRadius: "10px", borderBottomRightRadius: "10px",cursor:'pointer' }}>
            <ArrowBackIosNewIcon style={{ fontSize: "35px", opacity: "0.7 !important" }} onClick={() => sliderRef.current.slickPrev()} />
        </div>
    )
}
