import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useRef, useState } from "react";
import useMediaQuery from '@mui/material/useMediaQuery';
import MainSliderBackArrow from "./MainSliderBackArrow";
import MainSliderForwordArrow from "./MainSliderForwardArrow.";
import { serverURL } from "../../../backendservices/FetchNodeServices";
import { useNavigate } from "react-router-dom";

export default function MainSlider({data}) {
    const [sliderArrow, setSliderArrow] = useState("");
    const matches = useMediaQuery('(max-width:780px)');
    const sliderRef = useRef(null);
    const navigate=useNavigate()

    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        cssEase: 'ease-in-out',
        arrows: false,
    };

   

    return (
        <div style={{ maxWidth: '100vw', position: "relative",boxSizing:"border-box" }}>
            <MainSliderBackArrow sliderRef={sliderRef} />
            <MainSliderForwordArrow sliderRef={sliderRef} />
            <div style={{ width: "100%" ,zIndex:0.2}}>
                <Slider ref={sliderRef} {...settings}>
                    {
                        data.map((item, i) => (
                            <div key={i} style={{ width: "100%", boxSizing: "border-box" ,cursor:"pointer"}} onClick={()=>navigate(`/product/${item.productdetailid}/${item.productid}`)}>
                               
                                <img
                                src={`${serverURL}/images/${item.bannerImage}`}
                                    alt={`slide-${i}`}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        display: "block",
                                        objectFit: "cover",
                                        cursor:"pointer"
                                    }}
                                />
                            </div>
                        ))
                    }
                </Slider>
            </div>
        </div>
    );
}
