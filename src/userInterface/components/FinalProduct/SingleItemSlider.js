import React from 'react'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useRef, useState } from "react";
import useMediaQuery from '@mui/material/useMediaQuery';
import { serverURL } from '../../../backendservices/FetchNodeServices';

// import { serverURL } from "../../backendservices/FetchNodeServices";

export default function SingleItemSlider({ data }) {
    const matches = useMediaQuery('(max-width:780px)');
    const sliderRef = useRef(null);
    const [currentSlide, setCurrentSlide] = useState(0);

    const settings = {
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        arrows: false,
        dots: true,
        dotsClass: "slick-dots",
        beforeChange: (current, next) => {
            setCurrentSlide(next);
        },
        appendDots: dots => (
            <div style={{ bottom: '-35px' }}>
                <ul style={{ margin: '0' }}>{dots}</ul>
            </div>
        ),
        customPaging: i => (
            <div style={{
                width: '6px',
                height: '6px',
                border: '1px solid #fff',
                borderRadius: '50%',
                backgroundColor: currentSlide === i ? "#12DAA8" : '#fff',
                outline: 'none'
            }}
                className="custom-dot"
            />
        ),
        focusOnSelect: false
    };


    return (
        <div style={{ maxWidth: "100%", position: "relative", boxSizing: "border-box" }}>
            <Slider ref={sliderRef} {...settings}>
                {
                    data?.map((item, i) => (
                        <div key={i} style={{ width: "100%", boxSizing: "border-box" }}>
                            {item.includes("webm") ?
                                <video
                                    src={`${serverURL}/images/${item}`}
                                    width="100%"
                                    controls
                                    autoPlay
                                    muted
                                    loop
                                    style={{ objectFit: "contain",marginTop:60 }}
                                /> :

                                <img
                                    src={`${serverURL}/images/${item}`}
                                    alt={`slide-${i}`}
                                    style={{ objectFit: "contain", width: '100%', maxWidth: 300, marginLeft: "auto", marginRight: "auto" }}

                                />
                            }
                        </div>
                    ))
                }
            </Slider>
        </div>
    );
}
