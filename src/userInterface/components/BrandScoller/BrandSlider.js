// Import required dependencies for slider functionality
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useRef, useState } from "react";
import { useMediaQuery } from '@mui/material';
import ScrollerBackArrow from "../ProductScroller/ScrollerBackArrow";
import ScrollerForwardArrow from "../ProductScroller/ScrollerForwardArrow";
import BrandCard from "./BrandCard";

// BrandSlider component for displaying brand logos in a carousel
export default function BrandSlider({ data }) {
    // State and refs for slider control
    const matches = useMediaQuery('(max-width:780px)');
    const sliderRef = useRef(null);

    // Slider configuration settings
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: matches ? 3 : 5,  // Show 3 slides on mobile, 5 on desktop
        slidesToScroll: 1,
        cssEase: 'ease-in-out',
        arrows: false,  // Custom arrows implemented separately
    };

    return (
        // Main container for brand slider
        <div style={{ maxWidth: '100%', boxSizing: "border-box", display: "flex", alignItems: "center" }}>
            {/* Left navigation arrow */}
            <div style={{marginRight:"auto"}}>
                <ScrollerBackArrow sliderRef={sliderRef} />
            </div>
            {/* Slider container with width control */}
            <div style={{ width: "95%", boxSizing: "border-box" }}>
                <Slider ref={sliderRef} {...settings}>
                    {/* Map through brand data and render BrandCard components */}
                    {
                        data.map((item, i) => (
                            <BrandCard key={i} logo={item.brandlogo} brandid={item.brandid} />
                        ))
                    }
                </Slider>
            </div>
            {/* Right navigation arrow */}
             <div style={{marginLeft:"auto"}}>
               <ScrollerForwardArrow sliderRef={sliderRef} />
            </div>
           
        </div>
    );
}
