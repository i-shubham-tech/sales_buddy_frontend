import React from 'react'
import { Grid2, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Paper } from '@mui/material'
import { Routes, Route, useNavigate } from "react-router-dom";
import ServicesInterface from "../services/ServicesInterface";
import DisplayAllServices from "../services/DisplayAllServices";
import BrandsInterface from "../brands/BrandsInterface"
import DisplayAllBrands from "../brands/DisplayAllBrands"
import ProductInterface from "../products/ProductInterface"
import DisplayAllProducts from "../products/DisplayAllProducts"
import ProductColorInterface from "../productColors/ProductColorInterface";
import DisplayAllProductColor from "../productColors/DisplayAllProductColor";
import ProductVarientInterface from "../productVarient/ProductVarientInterface";
import DisplayAllProductVaient from "../productVarient/DisplayAllProductVaient";
import ProductDetailInterface from "../productDetail/ProductDetailInterface";
import DisplayAllProductDetail from "../productDetail/DisplayAllProductDetail";
import ProductPictureInterface from "../productPicture/ProductPictureInterface";
import AdvertismentInterface from "../Advertisment/AdvertismentInterface";
import DisplayOrdersInterface from '../Orders/DisplayOrdersInterface.js';
import BannerInterface from '../mainBannerSlider/bannerInterface.js';
import DisplayAllBannerInterface from '../mainBannerSlider/DisplayAllBanner.js';
import MenuAppBar from '../../userInterface/components/MenuAppBar.js';


function Dashboard() {
    const navigate = useNavigate()
    return (
        <div style={{ minHeight: "100vh", display: 'flex', flexDirection: 'column', background: "white" }}>
            <MenuAppBar />
            <Grid2 container spacing={2} sx={{ padding: 1 }}>
                <Grid2 size={2} style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: "flex", flexDirection: "column", width: "85%" }}>
                        <Paper sx={{ overflow: "auto", maxHeight: "560px", display: 'flex', width: "100%", flexDirection: 'column', alignItems: 'center', gap: "4px", padding: 2, marginTop: 3 }}>
                            <img src="/admin.jpeg" style={{ width: '120px', height: '120px', borderRadius: "100%", objectFit: 'cover' }} />
                            <div style={{ fontSize: 16, fontWeight: 'bold' }}>Kartik Aryan</div>
                            <div style={{ fontSize: 14, color: 'gray' }}>kartikaryan@gmail.com</div>
                            <div style={{ fontSize: 14, color: 'gray' }}>135678542</div>

                            <List disablePadding style={{ width: "100%" }}>
                                <ListItem disablePadding>
                                    <ListItemButton onClick={() => { navigate("/dashboard") }}>
                                        <ListItemIcon>
                                            <img src="/dashboard.png" style={{ width: '20px', height: '20px' }} />
                                        </ListItemIcon>
                                        <ListItemText primary="Dashboard" />

                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemButton onClick={() => { navigate("/dashboard/orders") }}>
                                        <ListItemIcon>
                                            <img src="/order.png" style={{ width: '20px', height: '20px' }} />
                                        </ListItemIcon>
                                        <ListItemText primary="Orders" />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemButton onClick={() => { navigate("/dashboard/displayallservices") }}>
                                        <ListItemIcon>
                                            <img src="/service.png" style={{ width: '20px', height: '20px' }} />
                                        </ListItemIcon>
                                        <ListItemText primary="Services" />
                                    </ListItemButton>
                                </ListItem>

                                <ListItem disablePadding>
                                    <ListItemButton onClick={() => { navigate("/dashboard/displayallbrands") }}>
                                        <ListItemIcon>
                                            <img src="/brandDash.png" style={{ width: '20px', height: '20px' }} />
                                        </ListItemIcon>
                                        <ListItemText primary="Brands" />

                                    </ListItemButton>
                                </ListItem>

                                <ListItem disablePadding>
                                    <ListItemButton onClick={() => { navigate("/dashboard/displayallproducts") }}>
                                        <ListItemIcon>
                                            <img src="/product.png" style={{ width: '20px', height: '20px' }} />
                                        </ListItemIcon>
                                        <ListItemText primary="Products" />

                                    </ListItemButton>
                                </ListItem>

                                <ListItem disablePadding>
                                    <ListItemButton onClick={() => { navigate("/dashboard/DisplayAllProductColor") }}>
                                        <ListItemIcon>
                                            <img src="/color.png" style={{ width: '20px', height: '20px' }} />
                                        </ListItemIcon>
                                        <ListItemText primary="Colors" />

                                    </ListItemButton>
                                </ListItem>

                                <ListItem disablePadding>
                                    <ListItemButton onClick={() => { navigate("/dashboard/DisplayAllProductVarient") }}>
                                        <ListItemIcon>
                                            <img src="/variant.png" style={{ width: '20px', height: '20px' }} />
                                        </ListItemIcon>
                                        <ListItemText primary="Variant" />

                                    </ListItemButton>
                                </ListItem>

                                <ListItem disablePadding>
                                    <ListItemButton onClick={() => { navigate("/dashboard/displayallproductdetail") }}>
                                        <ListItemIcon>
                                            <img src="/detail.png" style={{ width: '20px', height: '20px' }} />
                                        </ListItemIcon>
                                        <ListItemText primary="Detail" />

                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemButton onClick={() => { navigate("/dashboard/ProductPictureInterface") }}>
                                        <ListItemIcon>
                                            <img src="/picture.png" style={{ width: '20px', height: '20px' }} />
                                        </ListItemIcon>
                                        <ListItemText primary="More Picture" />

                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemButton onClick={() => { navigate("/dashboard/DisplayAllBannerInterface") }}>
                                        <ListItemIcon>
                                            <img src="/banner.png" style={{ width: '20px', height: '20px' }} />
                                        </ListItemIcon>
                                        <ListItemText primary="Banner" />

                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemButton onClick={() => { navigate("/dashboard/advertisment") }}>
                                        <ListItemIcon>
                                            <img src="/ads.png" style={{ width: '20px', height: '20px' }} />
                                        </ListItemIcon>
                                        <ListItemText primary="Advertisment" />

                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemButton onClick={() => { navigate("/AdminLogin") }}>
                                        <ListItemIcon>
                                            <img src="/logout.png" style={{ width: '20px', height: '20px' }} />
                                        </ListItemIcon>
                                        <ListItemText primary="Logout" />
                                    </ListItemButton>
                                </ListItem>


                            </List>
                        </Paper>
                    </div>
                </Grid2>
                <Grid2 size={10} marginTop={3}>

                    <Routes>
                        <Route element={<ServicesInterface />} path="/serviceinterface" />
                        <Route element={<DisplayAllServices />} path="/displayallservices" />
                        <Route element={<DisplayAllBrands />} path="/displayallbrands" />
                        <Route element={<BrandsInterface />} path="/brandsinterface" />
                        <Route element={<DisplayAllProducts />} path="/displayallproducts" />
                        <Route element={<ProductInterface />} path="/productinterface" />
                        <Route element={<ProductColorInterface />} path="/productColorinterface" />
                        <Route element={<DisplayAllProductColor />} path="/DisplayAllProductColor" />
                        <Route element={<ProductVarientInterface />} path="/ProductVarientInterface" />
                        <Route element={<DisplayAllProductVaient />} path="/DisplayAllProductVarient" />
                        <Route element={<ProductDetailInterface />} path="/ProductDetailInterface" />
                        <Route element={<DisplayAllProductDetail />} path="/DisplayAllProductDetail" />
                        <Route element={<BannerInterface />} path="/BannerInterface" />
                        <Route element={<DisplayAllBannerInterface />} path="/DisplayAllBannerInterface" />
                        <Route element={<ProductPictureInterface />} path="/ProductPictureInterface" />
                        <Route element={<AdvertismentInterface />} path="/advertisment" />
                        <Route element={<DisplayOrdersInterface />} path="/orders" />

                    </Routes>
                </Grid2>

            </Grid2>


        </div>
    )
}

export default Dashboard