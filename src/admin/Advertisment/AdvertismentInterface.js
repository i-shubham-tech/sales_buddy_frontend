import React, { useEffect, useState } from 'react'
import { Button, FormControl, FormHelperText, Grid2, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import useStyles from "./AdvertismentInterfaceCss.js"
import { getAuthData, postAuthData } from '../../backendservices/FetchNodeServices.js'
import { data, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

function AdvertismentInterface() {
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
    const [imageNumber, setImageNumber] = useState("")
    const [description, setDescription] = useState("")
    const [adPicture, setAdpicture] = useState([])

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
            const response = await postAuthData("productdetails/fetch_productdetail_by_product", { productid: product_id })
            if (response.status) {
                setProductDetailList(response.data)
            }
        } catch (error) {
            console.log("Error in product_Color jsx fetching product list", error)
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
        setAdpicture(Object.values(Image))
    }


    // error handling & validation
    const handleErrorMessage = (label, errorMessage) => {
        setError((prev) => ({ ...prev, [label]: errorMessage }))
    }
    // const handleValidation = () => {
    //     let err = false
    //     if (serviceId.length === 0) {
    //         err = true
    //         handleErrorMessage('serviceId', "Pls Select Service..")
    //     }
    //     if (brandId.length === 0) {
    //         err = true
    //         handleErrorMessage('brandId', "Pls Select Brand..")
    //     }
    //     if (productId.length === 0) {
    //         err = true
    //         handleErrorMessage('productId', "Pls Select Product..")
    //     }
    //     if (productColor.length === 0) {
    //         err = true
    //         handleErrorMessage('productColor', "Pls Input Product Color..")
    //     }
    //     if (productColorName.length === 0) {
    //         err = true
    //         handleErrorMessage('productColorName', "Pls Input Product Color Name..")
    //     }
    //     return err
    // }
    // const handleReset = () => {
    //     setServiceId("")
    //     setBrandId("")
    //     setProductId("")
    //     setProductColor("")
    //     setProductColorName("")
    //     setError({})
    //     setBrandList([])
    //     setProductList([]);
    // }

    // handle submit
    const handleSumbit = async (e) => {
        const formData = new FormData();
        formData.append("serviceid", serviceId);
        formData.append("brandid", brandId);
        formData.append("productid", productId);
        formData.append("productdetailid", productDetailId);
        formData.append("imageNumber", imageNumber);
        formData.append("description", description);
        adPicture.map((item, i) => {
            formData.append(`picture${i}`, item)
        })


        try {
            const response = await postAuthData("advertisment/insert_ads",formData)
            if (response.status) {
                Swal.fire({
                    icon: "success",
                    title: "Product Color",
                    text: response.message,
                    toast: true
                })
            }
            else{
                Swal.fire({
                    icon: "error",
                    title: "Product Color",
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
                    <h1 className={classes.title_style}>Advertisement</h1>
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
                            <Grid2 size={4}>
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
                            <Grid2 size={4}>
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

                            {/* Product */}
                            <Grid2 size={4}>
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
                            </Grid2>

                            <Grid2 size={6}>
                                <FormControl fullWidth error={error.productId}>
                                    <InputLabel id="product">Product Detail</InputLabel>
                                    <Select label="Product Detail" labelId="product" onFocus={() => handleErrorMessage('productId', "")} onChange={(e) => setProductDetailId(e.target.value)} value={productDetailId}>
                                        <MenuItem value="">Select Product</MenuItem>
                                        {productDetailList.map((item) => (
                                            <MenuItem key={item.productdetailid} value={item.productdetailid} style={{ textOverflow: "ellipsis" }}>
                                                {item.imei} {item.productram} {item.productstorage} <span style={{ marginLeft: 5, width: 20, height: 20, border: "1px solid gray", padding: 1, borderRadius: "100%", background: item.productcolor }}></span>
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <FormHelperText>{error.productId}</FormHelperText>
                                </FormControl>
                            </Grid2>


                            <Grid2 size={6}>
                                <div>
                                    <TextField
                                        label="Image Number"
                                        variant="outlined"
                                        fullWidth
                                        value={imageNumber}
                                        onChange={(e) => setImageNumber(e.target.value)}
                                    />
                                </div>
                            </Grid2>
                            {/* Color Name */}
                            <Grid2 size={12}>

                                <TextField
                                    label="Description"
                                    variant="outlined"
                                    fullWidth
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </Grid2>

                            {/* Buttons */}
                            <Grid2 size={5} sx={{ display: "flex", justifyContent: "center" }}>
                                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                    {adPicture.map((item) => (
                                        <img src={URL.createObjectURL(item)} style={{ height: 40, width: 40 }} />
                                    ))
                                    }
                                </div>
                            </Grid2>
                            <Grid2 size={7}>
                                <Button variant="contained" component="label" fullWidth className={classes.button_style}>
                                    Upload
                                    <input type="file" hidden multiple onChange={handleImageChange} />
                                </Button>
                            </Grid2>
                             <Grid2 size={6} >
                                <Button type="button" variant="contained" component="label" fullWidth className={classes.button_style} onClick={handleSumbit}>
                                   Submit
                                </Button>
                            </Grid2>
                            <Grid2 size={6} >
                                <Button type="button" variant="contained" component="label" fullWidth className={classes.button_style} onClick={handleSumbit}>
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

export default AdvertismentInterface