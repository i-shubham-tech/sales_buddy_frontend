import React, { useEffect, useRef, useState } from 'react'
import ProductInfo from '../components/FinalProduct/ProductInfo'
import ProductPicture from '../components/FinalProduct/ProductPicture'
import { Divider, Grid2, Typography } from '@mui/material'
import CategoryNavigator from '../components/CategoryNavigator'
import Specification from '../components/FinalProduct/Specification'
import { useParams } from 'react-router-dom'
import { postData } from '../../backendservices/FetchNodeServices'
import useMediaQuery from '@mui/material/useMediaQuery'
import AddToCard from '../components/Cart/AddToCard'
import { useDispatch } from "react-redux"


export default function FinalProduct() {
    const matches = useMediaQuery('(max-width:1000px)')
    const sm = useMediaQuery('(max-width:500px)')
    const dispatch = useDispatch()
    const { productdetailid, productid } = useParams()
    const [productData, setProductData] = useState({})
    const [productImage, setProductImage] = useState({})
    const fetch_Product_data = async () => {
        const response = await postData("userInterface/userinterface_fetch_productdetail_by_id", { "productdetailid": productdetailid })
        setProductData(response?.data)
    }
    const fetch_Product_image = async () => {
        const response = await postData("userInterface/userinterface_fetch_image_by_id", { "productdetailid": productdetailid })
        setProductImage(response?.data)
    }
    const handleProductQnty = (v) => {
        if (v == 0) {
            dispatch({ type: "DEL_CART", payload: [productdetailid] })
        }
        else {
            const data = productData;
            data["quantity"] = v
            dispatch({ type: "ADD_CART", payload: [productdetailid, data] })

        }
    }
    useEffect(() => {
        fetch_Product_data()
        fetch_Product_image()
        window.scrollTo(0, 0)
    }, [productdetailid])

    return (
        <div tabIndex={-1} style={{ maxWidth: "1200px", width: "100%", marginBottom: 30, height: "100%", marginLeft: "auto", marginRight: "auto", color: "white", display: "flex", flexDirection: "column", padding: "0px 10px", boxSizing: "border-box" }}>
            <CategoryNavigator />
            <Grid2 container spacing={matches ? 6 : 4} >
                <Grid2 size={matches ? 12 : 6} sx={{ position: matches ? "relative" : "sticky", top: matches ? 0 : 100, alignSelf: "flex-start" }}>
                    <ProductPicture data={productImage} />
                    <Divider sx={{ background: "white", marginLeft: sm ? 2 : 10, marginRight: sm ? 2 : 10, marginTop: sm ? 5 : 0 }} />
                    <AddToCard productdetailid={productdetailid} onChange={handleProductQnty} />

                </Grid2>
                <Grid2 size={matches ? 12 : 6} >
                    <ProductInfo data={productData} productid={productid} />
                </Grid2>
            </Grid2>
            <Specification />

        </div>
    )
}
