
import React, { useState } from 'react'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import useMediaQuery from '@mui/material/useMediaQuery'

export default function VerticalSliderUpArrow({ sliderRef }) {

    const [sliderArrow, setSliderArrow] = useState(".6")
    return (
        <div
            onClick={() => sliderRef.current.slickPrev()}
            onMouseOver={() => setSliderArrow("1")}
            onMouseLeave={() => setSliderArrow(".6")}
            style={{
                color: "white",
                cursor: 'pointer', 
            }}>
            <KeyboardArrowUpIcon style={{ fontSize: "50px", opacity:sliderArrow }} />
        </div>
    )
}

