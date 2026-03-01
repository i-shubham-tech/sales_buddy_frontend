
import React, { useState } from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import useMediaQuery from '@mui/material/useMediaQuery'


export default function VerticalSliderDownArrow({ sliderRef }) {

    const [sliderArrow, setSliderArrow] = useState(".6")
    return (
        <div
            onClick={() => sliderRef.current.slickNext()}
            onMouseOver={() => setSliderArrow("1")}
            onMouseLeave={() => setSliderArrow(".6")}
            style={{
                color: "white",
                cursor: 'pointer',
            }}>
            <KeyboardArrowDownIcon style={{ fontSize: "50px", opacity:sliderArrow }} />
        </div>
    )
}

