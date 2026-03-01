import React, { useState } from "react";
import Product from "./Product";
import Slider from "react-slick";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useRef } from "react";
import ProductCard from "./Product";
import { Grid2 } from "@mui/material";

export default function ProductsLobby({ data }) {

    const sliderRef = useRef()
    const theme = useTheme();
    const sm = useMediaQuery('(max-width:750px)')



    const [showAll, setShowAll] = useState(false);
    const showProduct = () => {
        const itemsToShow = showAll ? data : data.slice(0, 6);
        return itemsToShow.map((item, i) => (
            <Grid2 size={sm?12:4}>
                <ProductCard product={item} />
            </Grid2>
        ));
    };

    const handleToggle = () => {
        setShowAll(!showAll);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#191919', flexDirection: 'column' }}>
            <div style={{ maxWidth: "1200px", marginLeft: "auto", marginRight: "auto", width: '100%', background: '#191919', boxSizing: "border-box", padding: "0 5px" }}>
                <Grid2 container spacing={4}>
                    {
                        showProduct()
                    }
                </Grid2>
            </div>
            <button
                onClick={handleToggle}
                style={{
                    marginTop: 20,
                    padding: '12px 35px',
                    background: '#191919',
                    border: '1px solid #fff',
                    color: '#fff',
                    borderRadius: 8,
                    cursor: 'pointer',
                    fontWeight: 'bold'
                }}
            >
                {showAll ? "View Less" : "View More"}
            </button>
        </div>
    );
}