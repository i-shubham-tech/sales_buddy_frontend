import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useRef } from "react";
// import useMediaQuery from '@mui/material/useMediaQuery';
import VerticalSliderCard from "./VerticalSliderCard";
import VerticalSliderUpArrow from "./VerticalSliderUpArrow";
import VerticalSliderDownArrow from "./VerticalSliderDownArrow";

export default function VerticalSlider({data,selectedImage,setSelectedImage}) {
    const sliderRef = useRef(null);
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow:  4,
        slidesToScroll: 1,
         vertical: true,
        arrows: false,
        
    };

   

    return (
        <div style={{width:86 }}>
            <div style={{display:"flex",justifyContent:"center"}}>
                <VerticalSliderUpArrow sliderRef={sliderRef}/>
            </div>
            <div style={{ overflowX: "hidden", boxSizing: "border-box" }}>
                <Slider  ref={sliderRef} {...settings}>
                    {data?.map((item,i) => {

                        return (

                          <VerticalSliderCard key={i} selectedImage={selectedImage} data={item} setSelectedImage={setSelectedImage}/>

                        )
                    })}
                </Slider>
            </div>
            <div style={{display:"flex",justifyContent:"center"}} >
                <VerticalSliderDownArrow sliderRef={sliderRef} />
            </div>
        </div>
    );
}
