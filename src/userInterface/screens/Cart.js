import { Grid2, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'
import ListContainer from '../components/Cart/ListContainer';
import OrderSummary from '../components/Cart/OrderSummary';
import { useSelector } from 'react-redux';
export default function Cart() {
    const lg = useMediaQuery('(max-width:1024px)');
    const sm = useMediaQuery('(max-width:500px)');
    const product=useSelector(state=>state.cart)
    const productData=Object.values(product)

    useEffect(()=>{
         window.scrollTo(0, 0)
    },[])

    return (

        <div style={{ backgroundColor: "#F9F9F9", minHeight: "100vh", padding: 20 }}>
            <div style={{ marginLeft: "auto", marginRight: "auto", maxWidth: 1170, paddingTop:sm?0: 40, paddingBottom: 20, display: "flex", flexDirection: "column" }}>
                <Typography sx={{ fontSize: 20, fontWeight: 700 }}>YOUR CART</Typography>
                <div style={{ paddingTop:sm?20: 40, display: "flex", flexGrow: 1, }}>
                    <Grid2 container spacing={2} sx={{ width: "100%" }}>
                        <Grid2 size={lg ? 12 : 8.5}>
                            <ListContainer productData={productData}/>
                        </Grid2>
                        <Grid2 size={lg ? 12 : 3.5} >
                            <OrderSummary productData={productData} />
                        </Grid2>
                    </Grid2>



                </div>
            </div>


        </div>
    )
}
