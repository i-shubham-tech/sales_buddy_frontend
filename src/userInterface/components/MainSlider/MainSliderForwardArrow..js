import React, { useState } from 'react'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import useMediaQuery from '@mui/material/useMediaQuery'


export default function MainSliderForwordArrow({sliderRef}) {
        const matches = useMediaQuery('(max-width:780px)');
    const [sliderArrow, setSliderArrow] = useState("rgba(37, 37, 37, 0.3)")
    return (
        <div onClick={() => sliderRef.current.slickNext()} onMouseOver={() => setSliderArrow("rgba(37, 37, 37,0.6)")} onMouseLeave={() => setSliderArrow("rgba(37, 37, 37, 0.3)")} style={{ position: "absolute", zIndex:1, color: "white", top: "47%", right: "0", height: "60px", width: "52px", background:sliderArrow, display: matches ? "none" : "flex", alignItems: "center", justifyContent: 'center', borderTopLeftRadius: "10px", borderBottomLeftRadius: "10px",cursor:'pointer' }}>
            <ArrowForwardIosIcon style={{ fontSize: "35px", opacity: "0.7 !important" }}  />
        </div>
    )
}
