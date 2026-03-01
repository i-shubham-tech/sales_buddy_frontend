import React, { useEffect, useState } from 'react'
import { Button, FormControl, FormHelperText, Grid2, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import useStyles from "./productPictureIntefaceCss.js"
import { getAuthData, postAuthData } from '../../backendservices/FetchNodeServices.js'
import { data, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

function ProductPictureInterface() {
    const classes = useStyles()
    const navigate = useNavigate()

    // backend data store state
    const [serviceList, setServiceList] = useState([])
    const [brandList, setBrandList] = useState([])
    const [productList, setProductList] = useState([])
    const [productDetailList, setProductDetailList] = useState([])



    // current data store state
    const [serviceId, setServiceId] = useState("")
    const [brandId, setBrandId] = useState("")
    const [productId, setProductId] = useState("")
    const [productDetailId, setProductDetailId] = useState("")
    const [productpicture, setProductpicture] = useState([]);


    // error state
    const [error, setError] = useState({})


    // fetch data from backend
    const fetchServices = async () => {
        try {
            const response = await getAuthData("services/fetch_services")
            if (response.status) {
                setServiceList(response.data)
            }
        } catch (error) {
            console.log("Error in product_Color jsx fetching api- ", error)
        }
    }
    const fetchBrandByServiceId = async (service_id) => {
        try {
            const response = await postAuthData("brands/fetch_brands_by_services", { serviceid: service_id })
            if (response.status) {
                setBrandList(response.data)
            }
        } catch (error) {
            console.log("Error in product_Color jsx fetching brand list", error)
        }
    }
    const fetchProductByBrandId = async (brand_id) => {
        try {
            const response = await postAuthData("products/fetch_product_by_brand", { brandid: brand_id })
            if (response.status) {
                setProductList(response.data)
            }
        } catch (error) {
            console.log("Error in product_Color jsx fetching product list", error)
        }
    }
    const fetchProductDetailByProductId = async (product_id) => {
        try {
            const response = await postAuthData("productDetails/fetch_productdetail_by_product", { productid: product_id })
            if (response.status) {
                setProductDetailList(response.data)
            }
        } catch (error) {
            console.log("Error in productDetail jsx fetching product detail list", error)
        }
    }


    // handle dropdown change
    const handleServiceChange = (e) => {
        setServiceId(e.target.value)
        fetchBrandByServiceId(e.target.value)
    }
    const handleBrandChange = (e) => {
        setBrandId(e.target.value)
        fetchProductByBrandId(e.target.value)
    }
    const handleProductChange = (e) => {
        setProductId(e.target.value)
        fetchProductDetailByProductId(e.target.value)
    }
    const handleImageChange = (e) => {
        const Image = e.target.files;
        setProductpicture(Object.values(Image))
    }

    // error handling & validation
    const handleErrorMessage = (label, errorMessage) => {
        setError((prev) => ({ ...prev, [label]: errorMessage }))
    }
    const handleValidation = () => {
        let err = false
        if (serviceId.length === 0) {
            err = true
            handleErrorMessage('serviceId', "Pls Select Service..")
        }
        if (brandId.length === 0) {
            err = true
            handleErrorMessage('brandId', "Pls Select Brand..")
        }
        if (productId.length === 0) {
            err = true
            handleErrorMessage('productId', "Pls Select Product..")
        }
        if (productDetailId.length === 0) {
            err = true
            handleErrorMessage('productDetailId', "Pls Select Product Detail..")
        }
        if (productpicture.length === 0) {
            err = true
            handleErrorMessage('productpicture', "Pls Choose Product Picture..")
        }
        return err
    }
    const handleReset = () => {
        setServiceId("")
        setBrandId("")
        setProductId("")
        setProductDetailId("")
        setProductpicture([])
        setError({})
        setBrandList([])
        setProductList([]);
        setProductDetailList([]);
    }

    // handle submit
    const handleSumbit = async (e) => {
        const isError = handleValidation();
        if (isError) return;

        const formData = new FormData();
        formData.append("serviceid", serviceId);
        formData.append("brandid", brandId);
        formData.append("productid", productId);
        formData.append("productdetailid", productDetailId);
        productpicture.map((item, i) => {
            formData.append(`productpicture${i}`, item)
        })

        try {
            const response = await postAuthData("productpicture/insert_productpicture", formData)
            if (response.status) {
                Swal.fire({
                    icon: "success",
                    title: "Product Picture",
                    text: response.message,
                    toast: true
                })
                handleReset();
            }
            else {
                Swal.fire({
                    icon: "error",
                    title: "Product Picture",
                    text: response.message,
                    toast: true
                })
            }
        }


        catch (error) {
            Swal.fire({
                icon: "success",
                title: "Product Color",
                text: error.response.data.message,
                toast: true
            })

        }




    }

    useEffect(() => {
        fetchServices()
    }, [])

    return (
        <section className={classes.root}>
            <div className={classes.box}>
                <div className={classes.title}>
                    <div>
                        <img src="/logo.png" className={classes.logo_style} alt="Logo" />
                    </div>
                    <h1 className={classes.title_style}>Product Picture</h1>
                    <div>
                        <img
                            src="/report.png"
                            className={classes.report_style}
                            alt="Navigate Icon"
                            onClick={() => { navigate("/dashboard/DisplayAllProductColor") }}
                        />
                    </div>
                </div>
                <div>
                    {/* form data */}
                    <form className={classes.form_box}>
                        {/* Service & Brand */}
                        <Grid2 container spacing={2}>
                            <Grid2 size={6}>
                                <FormControl fullWidth error={error.serviceId}>
                                    <InputLabel id="service">Services</InputLabel>
                                    <Select label="Services" labelId="service" onFocus={() => handleErrorMessage('serviceId', "")} onChange={handleServiceChange} value={serviceId}>
                                        <MenuItem value="">Select Service</MenuItem>
                                        {serviceList.map((item) => (
                                            <MenuItem key={item.serviceid} value={item.serviceid}>
                                                {item.servicetype} {item.servicename}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <FormHelperText>{error.serviceId}</FormHelperText>
                                </FormControl>
                            </Grid2>
                            <Grid2 size={6}>
                                <FormControl fullWidth error={error.brandId}>
                                    <InputLabel id="brand">Brands</InputLabel>
                                    <Select label="Brands" labelId="brand" onFocus={() => handleErrorMessage('brandId', "")} onChange={handleBrandChange} value={brandId}>
                                        <MenuItem value="">Select Brand</MenuItem>
                                        {brandList.map((item) => (
                                            <MenuItem key={item.brandid} value={item.brandid}>
                                                {item.brandname}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <FormHelperText>{error.brandId}</FormHelperText>
                                </FormControl>
                            </Grid2>
                        </Grid2>
                        {/* Product */}
                        <div>
                            <FormControl fullWidth error={error.productId}>
                                <InputLabel id="product">Product</InputLabel>
                                <Select label="Product" labelId="product" onFocus={() => handleErrorMessage('productId', "")} onChange={handleProductChange} value={productId}>
                                    <MenuItem value="">Select Product</MenuItem>
                                    {productList.map((item) => (
                                        <MenuItem key={item.productid} value={item.productid}>
                                            {item.productname}
                                        </MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText>{error.productId}</FormHelperText>
                            </FormControl>
                        </div>

                        {/* color detail  */}
                        <div>
                            <FormControl fullWidth error={error.productDetailId}>
                                <InputLabel id="productDetail">Product Detail</InputLabel>
                                <Select label="Product Detail" labelId="productDetail" onFocus={() => handleErrorMessage('productDetailId', "")} onChange={(e) => setProductDetailId(e.target.value)} value={productDetailId}>
                                    {productDetailList.map((item) => (
                                        <MenuItem key={item.productdetailid} value={item.productdetailid}>
                                            <div style={{ display: "flex", alignItems: "center" }}> {item.imei}<div style={{ width: 20, display: "inline-block", height: 20, borderRadius: "100%", border: "1px solid black", padding: 1, background: item.productcolor, marginLeft: 5 }}></div></div>
                                        </MenuItem>
                                    ))}
                                </Select>
                                <FormHelperText>{error.productDetailId}</FormHelperText>
                            </FormControl>
                        </div>
                        {/* Product Picture */}
                        <Grid2 container spacing={2}>
                            <Grid2 size={5} >

                                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                    {productpicture.map((item) => (

                                        <img src={URL.createObjectURL(item)} style={{ height: 40, width: 40 }} />
                                    ))
                                    }
                                </div>


                            </Grid2>
                            <Grid2 size={7}>
                                <Button variant="contained" component="label" fullWidth className={classes.button_style}>
                                    Choose Picture
                                    <input type="file" hidden accept="image/*" multiple onChange={handleImageChange} />
                                </Button>
                            </Grid2>
                        </Grid2>

                        {/* Buttons */}
                        <Grid2 container spacing={2}>
                            <Grid2 size={6}>

                                <Button type="button" variant="contained" fullWidth className={classes.button_style} onClick={handleSumbit}>
                                    Submit
                                </Button>
                            </Grid2>
                            <Grid2 size={6}>
                                <Button type="reset" variant="contained" fullWidth className={classes.button_style}>
                                    Reset
                                </Button>
                            </Grid2>
                        </Grid2>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default ProductPictureInterface