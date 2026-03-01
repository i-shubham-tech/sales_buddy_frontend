// Required imports for slider functionality and styling
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useRef } from "react";
import useMediaQuery from '@mui/material/useMediaQuery';
import ProductCard from "./ProductCard";
import ScrollerBackArrow from "./ScrollerBackArrow";
import ScrollerForwardArrow from "./ScrollerForwardArrow";
import { Typography } from "@mui/material";

// Main Scroller component for horizontal product scrolling
export default function Scroller({ title, data }) {
    // Media query breakpoints for responsive design
    const lg = useMediaQuery('(max-width:1290px)');
    const smalllg = useMediaQuery('(min-width:781px) and (max-width:1042px)');
    const md = useMediaQuery('(max-width:780px)');
    const sm = useMediaQuery('(max-width:500px)');
    const sliderRef = useRef(null);

    // Slider configuration settings
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: sm ? 2 : lg ? 3 : 4,  // Responsive slides count
        slidesToScroll: 1,
        cssEase: 'ease-in-out',
        arrows: false,
    };

    return (
        // Main container with column layout
        <div style={{ display: "flex", flexDirection: "column", gap: 15, width: "100%" }}>
            {/* Title section with responsive typography */}
            <Typography sx={{ paddingLeft: sm ? 2 : 5, fontSize: sm ? 16 : 29, fontWeight: 600 }} variant="h4" color="inherit" component="div">
                {title}
            </Typography>
            {/* Slider container with navigation arrows */}
            <div style={{ maxWidth: '100%', boxSizing: "border-box", display: "flex", alignItems: "center" }}>
                <ScrollerBackArrow sliderRef={sliderRef} />
                {/* Main slider content area */}
                <div style={{ width:md?"100%":smalllg?"93%":"95%", padding: md ? "0 10px" : "0", boxSizing: "border-box" }}>
                    <Slider ref={sliderRef} {...settings}>
                        {data.map((item, index) => {
                            return (
                                <div>
                                    <ProductCard key={index} data={item} />
                                </div>
                            )
                        })}
                    </Slider>
                </div>
                {/* Forward navigation arrow */}
                <div>
                    <ScrollerForwardArrow sliderRef={sliderRef} />
                </div>
            </div>
        </div>
    );
}
