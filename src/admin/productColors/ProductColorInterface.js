import React, { useEffect, useState } from 'react'
import { Button, FormControl, FormHelperText, Grid2, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import useStyles from "./productColorIntefaceCss.js"
import { getAuthData, postAuthData } from '../../backendservices/FetchNodeServices.js'
import { data, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

function ProductColorInterface() {
    const classes = useStyles()
    const navigate = useNavigate()

    // backend data store state
    const [serviceList, setServiceList] = useState([])
    const [brandList, setBrandList] = useState([])
    const [productList, setProductList] = useState([])

    // current data store state
    const [serviceId, setServiceId] = useState("")
    const [brandId, setBrandId] = useState("")
    const [productId, setProductId] = useState("")
    const [productColor, setProductColor] = useState("")
    const [productColorName, setProductColorName] = useState("")

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

    // handle dropdown change
    const handleServiceChange = (e) => {
        setServiceId(e.target.value)
        fetchBrandByServiceId(e.target.value)
    }
    const handleBrandChange = (e) => {
        setBrandId(e.target.value)
        fetchProductByBrandId(e.target.value)
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
        if (productColor.length === 0) {
            err = true
            handleErrorMessage('productColor', "Pls Input Product Color..")
        }
        if (productColorName.length === 0) {
            err = true
            handleErrorMessage('productColorName', "Pls Input Product Color Name..")
        }
        return err
    }
    const handleReset = () => {
        setServiceId("")
        setBrandId("")
        setProductId("")
        setProductColor("")
        setProductColorName("")
        setError({})
        setBrandList([])
        setProductList([]);
    }

    // handle submit
    const handleSumbit = async (e) => {
        const isError = handleValidation();
        if (isError) return;
        const body = {
            serviceid: serviceId,
            brandid: brandId,
            productid: productId,
            productcolor: productColor,
            productcolorname: productColorName

        }

        try {
            const response = await postAuthData("productColors/insert_productColors", body)
            if (response.status) {
                Swal.fire({
                    icon: "success",
                    title: "Product Color",
                    text: response.message,
                    toast: true
                })
                handleReset();
            }
            else {
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
                text: "internal server error",
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
                    <h1 className={classes.title_style}>Product Color</h1>
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
                                <Select label="Product" labelId="product" onFocus={() => handleErrorMessage('productId', "")} onChange={(e) => setProductId(e.target.value)} value={productId}>
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

                        {/* color code and name grid */}
                        <Grid2 container spacing={2}>
                            {/* Color Code */}
                            <Grid2 size={6}>
                                <div>
                                    <TextField
                                        label="Product Color Code"
                                        variant="outlined"
                                        fullWidth
                                        value={productColor}
                                        error={error.productColor}
                                        helperText={error.productColor}
                                        onFocus={() => handleErrorMessage('productColor', "")}
                                        onChange={(e) => setProductColor(e.target.value)}
                                    />
                                </div>
                            </Grid2>
                            {/* Color Name */}
                            <Grid2 size={6}>

                                <div>
                                    <TextField
                                        label="Product Color Name"
                                        variant="outlined"
                                        fullWidth
                                        value={productColorName}
                                        error={error.productColorName}
                                        helperText={error.productColorName}
                                        onFocus={() => handleErrorMessage('productColorName', "")}
                                        onChange={(e) => setProductColorName(e.target.value)}
                                    />
                                </div>
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

export default ProductColorInterface