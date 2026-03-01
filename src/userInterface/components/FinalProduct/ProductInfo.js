import React, { useEffect, useState } from 'react'
import StarIcon from '@mui/icons-material/Star';
import { Button, Divider, Radio } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ProductSummaryCard from './ProductSummaryCard ';
import ProductPrice from './ProductPrice';
import ProductExchange from './ProductExchange';
import OptionListSection from './OptionListSection ';
import DeliveryLocation from './DeliveryLocation';
import Features from './Features';
import Specification from './Specification';
import { postData } from '../../../backendservices/FetchNodeServices';

export default function ProductInfo({ data, productid }) {
   
    const [colors, setColors] = useState([]);
    const [ram, setRam] = useState([]);
    const [storage, setStorage] = useState([]);
   

    const fetch_color = async () => {
        const response = await postData("userInterface/userinterface_fetch_colors", { "productid": productid })
        setColors(response.data)

    }
    const fetch_ram = async () => {
        const response = await postData("userInterface/userinterface_fetch_ram", { "productid": productid })
        setRam(response.data)

    }
    const fetch_storage = async () => {
        const response = await postData("userInterface/userinterface_fetch_storage", { "productid": productid })
        setStorage(response.data)

    }

    useEffect(() => {
        fetch_color()
        fetch_ram()
        fetch_storage()
    }, [])
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 20, width: "100%" }}>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <ProductSummaryCard data={data} />
                <ProductPrice data={data} />
            </div>
            <ProductExchange />
            <OptionListSection title={"Colors"} productid={productid} data={colors} DefaultValue={data?.productcolorname} />
            <OptionListSection title={"Ram"} productid={productid} data={ram} DefaultValue={data?.productram} />
            <OptionListSection title={"Storage"} productid={productid} data={storage} DefaultValue={data?.productstorage} />
            <DeliveryLocation />
            <Features data={data}/>





        </div>
    )
}
