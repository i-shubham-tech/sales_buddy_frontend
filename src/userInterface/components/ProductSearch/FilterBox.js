
import React, { useState } from 'react';
import { Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FilterCategoryCard from './FilterCategoryCard';

export default function FilterBox({ onClose }) {
    const data = {
        category: ["Android Phones", "I Phones", "Mac Book", "Window"],
        brands: ["Apple", "Samsung", "Google", "OnePlus","Apple", "Samsung", "Google", "OnePlus"],
        price: ["Under $500", "$500-$1000", "Over $1000"],
        storage: ["64GB", "128GB", "256GB", "512GB"],
        delivery: ["Free Delivery", "Express Delivery", "Store Pickup"]
    }
    const field=Object.keys(data)
    return (
        <div style={{ display: 'flex', flexDirection: "column", gap: '10px', margin: '20px', background: "white", color: "black", width: "100%", height: "100vh", boxSizing: "border-box", padding: "35px 20px 20px 20px", overflowY: "scroll" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography sx={{ fontSize: 25, fontWeight: 700 }}>All Filters</Typography>
                <CloseIcon sx={{ cursor: "pointer" }} onClick={() => onClose(false)} />
            </div>

            {
                field?.map((item) => (
                    <FilterCategoryCard title={item} data={data[item]}/>
                ))
            }




        </div>
    );
};

