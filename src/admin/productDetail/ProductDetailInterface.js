import React, { useEffect, useState } from 'react'
import { Button, FormControl, FormHelperText, Grid2, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import useStyles from "./productDetailIntefaceCss.js"
import { getAuthData, postAuthData } from '../../backendservices/FetchNodeServices.js'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import ReactQuill from "react-quill-new";
import 'react-quill-new/dist/quill.snow.css';



function ProductDetailInterface() {
    const classes = useStyles()
    const navigate = useNavigate()

    // backend store data satte
    const [serviceList, setServiceList] = useState([])
    const [brandList, setBrandList] = useState([])
    const [productList, setProductList] = useState([])
    const [productColorList, setproductColorList] = useState([])
    const [productVarientList, setProductVarientList] = useState([])


    // current data satte
    const [serviceId, setServiceId] = useState("")
    const [brandId, setBrandId] = useState("")
    const [productId, setProductId] = useState("")
    const [productColorId, setProductColorId] = useState("")
    const [productVarientId, setProductVarientId] = useState("")
    const [imeiNo, setImeiNo] = useState("")
    const [productStatus, setProductStatus] = useState("")
    const [status, setStatus] = useState("")
    const [warranty, setWarranty] = useState("");
    const [price, setPrice] = useState("");
    const [offerPrice, setOfferPrice] = useState("");
    const [membershipPrice, setMembershipPrice] = useState("");
    const [description, setDescription] = useState("");
    const [condition, setCondition] = useState("");
    const [ratings, setRatings] = useState("");
    const [stock, setStock] = useState("");
    const [picture, setpicture] = useState({ filename: '/gadgets.png', bytes: '' })
    const [video, setVideo] = useState({ filename: '/video.png', bytes: '' })



    // error data
    const [error, setError] = useState({})

    // fetch backend data
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
    const fetchProductColorByProductId = async (product_id) => {
        try {
            const response = await postAuthData("productcolors/fetch_productcolor_by_product", { productid: product_id })
            if (response.status) {
                setproductColorList(response.data)
            }
        } catch (error) {
            console.log("Error in product_Color jsx fetching product list", error)
        }
    }
    const fetchProductVarientByProductId = async (product_id) => {
        try {
            const response = await postAuthData("productvarients/fetch_productvarient_by_product", { productid: product_id })
            if (response.status) {
                setProductVarientList(response.data)
            }
        } catch (error) {
            console.log("Error in product_Color jsx fetching product list", error)
        }
    }
    const fetchProductDetails = async () => {
        try {
            const response = await getAuthData("productdetails/fetch_productdetails")
            if (response.status) {
                setServiceList(response.data)
            }
        } catch (error) {
            console.log("Error in product_Color jsx fetching api- ", error)
        }
    }

    // handle dropdown changes
    const handleServiceChange = (e) => {
        setServiceId(e.target.value)
        fetchBrandByServiceId(e.target.value)
    }
    const handleBrandChange = (e) => {
        setBrandId(e.target.value)
        fetchProductByBrandId(e.target.value)
    }
    const handleProductChange = async (e) => {
        setProductId(e.target.value)
        await fetchProductColorByProductId(e.target.value)
        await fetchProductVarientByProductId(e.target.value)

    }

    // handle file changes
    const handlePictureChange = (e) => {
        const file = e.target.files[0];
        setpicture({ filename: URL.createObjectURL(file), bytes: file })
    }
    const handleVideoChange = (e) => {
        const file = e.target.files[0];
        setVideo({ filename: URL.createObjectURL(file), bytes: file })
    }


    // error handling
    const handleErrorMessage = (label, errorMessage) => {
        setError((prev) => ({ ...prev, [label]: errorMessage }))
    }

    //    after submit functionality

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
        if (productColorId.length === 0) {
            err = true
            handleErrorMessage('productColorId', "Pls Select Product Color..")
        }
        if (productVarientId.length === 0) {
            err = true
            handleErrorMessage('productVarientId', "Pls Select Product Varient..")
        }
        if (productVarientId.length === 0) {
            err = true
            handleErrorMessage('productVarientId', "Pls Select Product Varient..")
        }
        if (imeiNo.length === 0) {
            err = true
            handleErrorMessage('imeiNo', "Pls input imeiNo..")
        }
        if (productStatus.length === 0) {
            err = true
            handleErrorMessage('productStatus', "Pls Select productStatus ..")
        }
        if (status.length === 0) {
            err = true
            handleErrorMessage('status', "Pls Select Status ..")
        }
        if (warranty.length === 0) {
            err = true
            handleErrorMessage('warranty', "Pls select warranty..")
        }
        if (price.length === 0) {
            err = true
            handleErrorMessage('price', "Pls input price..")
        }
        if (offerPrice.length === 0) {
            err = true
            handleErrorMessage('offerPrice', "Pls input offerPrice..")
        }
        if (membershipPrice.length === 0) {
            err = true
            handleErrorMessage('membershipPrice', "Pls input membershipPrice..")
        }
        if (description.length === 0) {
            err = true
            handleErrorMessage('description', "Pls input description..")
        }
        if (condition.length === 0) {
            err = true
            handleErrorMessage('condition', "Pls Select condition ..")
        }
        if (ratings.length === 0) {
            err = true
            handleErrorMessage('ratings', "Pls input ratings..")
        }
        if (stock.length === 0) {
            err = true
            handleErrorMessage('stock', "Pls input stock..")
        }
        if (picture.bytes.length === 0) {
            err = true
            handleErrorMessage('picture', "Pls choose picture..")
        }
        if (video.bytes.length === 0) {
            err = true
            handleErrorMessage('video', "Pls choose video..")
        }
        return err
    }
    const handleReset = () => {
        setServiceId("");
        setBrandId("");
        setProductId("");
        setProductColorId("");
        setProductVarientId("");
        setImeiNo("")
        setProductStatus("")
        setStatus("")
        setWarranty("");
        setPrice("");
        setOfferPrice("");
        setMembershipPrice("");
        setDescription("");
        setCondition("");
        setRatings("");
        setStock("");
        setpicture({ filename: '/gadgets.png', bytes: '' });
        setVideo({ filename: '/video.png', bytes: '' });
        setError({});
        setBrandList([]);
        setProductList([]);
        setproductColorList([]);
        setProductVarientList([]);

    }
    const handleSumbit = async (e) => {
        console.log(serviceId, brandId, productId, productColorId, productVarientId, imeiNo, productStatus, warranty, price, offerPrice, membershipPrice, description, condition, ratings, stock)
        const isError = handleValidation();
        if (isError) return;

        const formData = new FormData();
        formData.append("serviceid", serviceId)
        formData.append("brandid", brandId)
        formData.append("productid", productId)
        formData.append("productcolorid", productColorId)
        formData.append("productvarientid", productVarientId)
        formData.append("imei", imeiNo)
        formData.append("productstatus", productStatus)
        formData.append("warranty", warranty)
        formData.append("price", price)
        formData.append("offerprice", offerPrice)
        formData.append("membershipprice", membershipPrice)
        formData.append("description", description)
        formData.append("condition", condition)
        formData.append("ratings", ratings)
        formData.append("stock", stock)
        formData.append("picture", picture.bytes)
        formData.append("video", video.bytes)
        try {
            const response = await postAuthData("productdetails/insert_productdetails", formData)
            if (response.status) {
                Swal.fire({
                    icon: "success",
                    title: "Product Detail",
                    text: response.message,
                    toast: true
                })
                handleReset();
            }
            else {
                Swal.fire({
                    icon: "error",
                    title: "Product Detail",
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
                    <h1 className={classes.title_style}>Product Detail</h1>
                    <div>
                        <img
                            src="/report.png"
                            className={classes.report_style}
                            alt="Navigate Icon"
                            onClick={() => { navigate("/dashboard/DisplayAllProductDetail") }}
                        />
                    </div>
                </div>
                <div>
                    {/* form data */}
                    <form className={classes.form_box}>
                        <Grid2 container spacing={2}>
                            {/* service grid */}
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

                            {/* brand grid */}
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

                            {/* product grid */}
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

                            {/* productColor grid */}
                            <Grid2 size={4}>
                                <FormControl fullWidth error={error.productColorId}>
                                    <InputLabel id="product color">Product Color</InputLabel>
                                    <Select label="Product Color" labelId="product color" onFocus={() => handleErrorMessage('productColorId', "")} onChange={(e) => setProductColorId(e.target.value)} value={productColorId}>
                                        <MenuItem value="">Select Product Color</MenuItem>
                                        {productColorList.map((item) => (
                                            <MenuItem key={item.productcolorid} value={item.productcolorid}>
                                                {item.productcolorname}<div style={{ height: 20, width: 20, background: item.productcolor, borderRadius: "100%", marginLeft: 20 }}></div>
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <FormHelperText>{error.productColorId}</FormHelperText>
                                </FormControl>
                            </Grid2>

                            {/* productVarient grid */}
                            <Grid2 size={4}>
                                <FormControl fullWidth error={error.productVarientId}>
                                    <InputLabel id="product varient">Product Varient</InputLabel>
                                    <Select label="Product Varient" labelId="product varient" onFocus={() => handleErrorMessage('productVarientId', "")} onChange={(e) => setProductVarientId(e.target.value)} value={productVarientId}>
                                        <MenuItem value="">Select Product</MenuItem>
                                        {productVarientList.map((item) => (
                                            <MenuItem key={item.productvarientid} value={item.productvarientid}>
                                                {item.productram} {item.productstorage}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <FormHelperText>{error.productVarientId}</FormHelperText>
                                </FormControl>
                            </Grid2>

                            {/* status grid */}
                            <Grid2 size={4}>
                                <FormControl fullWidth error={error.status}>
                                    <InputLabel id="status">Status</InputLabel>
                                    <Select label="Status" labelId="Status" onFocus={() => handleErrorMessage('status', "")} onChange={(e) => setStatus(e.target.value)} value={status}>
                                        <MenuItem value="">Select Warranty</MenuItem>
                                        <MenuItem value="Latest Lunches">Latest Lunches</MenuItem>
                                        <MenuItem value="Summer Hot Deal">Summer Hot Deal</MenuItem>
                                        <MenuItem value="Winter Hot Deal">Winter Hot Deal</MenuItem>
                                    </Select>
                                    <FormHelperText>{error.status}</FormHelperText>
                                </FormControl>
                            </Grid2>

                            {/* product imei no */}
                            <Grid2 size={4}>
                                <TextField
                                    label="IMEI No"
                                    variant="outlined"
                                    fullWidth
                                    onChange={(e) => setImeiNo(e.target.value)}
                                    value={imeiNo}
                                    onFocus={() => handleErrorMessage('imeiNo', "")}
                                    error={error.imeiNo}
                                    helperText={error.imeiNo}
                                />
                            </Grid2>

                            {/* product status grid */}
                            <Grid2 size={4}>
                                <FormControl fullWidth error={error.productStatus}>
                                    <InputLabel id="product Status">Product Status</InputLabel>
                                    <Select label="Product Status" labelId="product Status" onFocus={() => handleErrorMessage('productStatus', "")} onChange={(e) => setProductStatus(e.target.value)} value={productStatus}>
                                        <MenuItem value="">Select Product Status</MenuItem>
                                        <MenuItem value="New">New</MenuItem>
                                        <MenuItem value="Old">Old</MenuItem>
                                        <MenuItem value="Refurbished">Refurbished</MenuItem>
                                    </Select>
                                    <FormHelperText>{error.productStatus}</FormHelperText>
                                </FormControl>
                            </Grid2>

                            {/* product Warrenty grid*/}
                            <Grid2 size={4}>
                                <FormControl fullWidth error={error.warranty}>
                                    <InputLabel id="warranty">Warranty</InputLabel>
                                    <Select label="Warranty" labelId="warranty" onFocus={() => handleErrorMessage('warranty', "")} onChange={(e) => setWarranty(e.target.value)} value={warranty}>
                                        <MenuItem value="">Select Warranty</MenuItem>
                                        <MenuItem value="No Warranty">No Warranty</MenuItem>
                                        <MenuItem value="1 Month">1 Month</MenuItem>
                                        <MenuItem value="2 Month">2 Month</MenuItem>
                                        <MenuItem value="3 Month">3 Month</MenuItem>
                                        <MenuItem value="4 Month">4 Month</MenuItem>
                                        <MenuItem value="5 Month">5 Month</MenuItem>
                                        <MenuItem value="6 Month">6 Month</MenuItem>
                                        <MenuItem value="7 Month">7 Month</MenuItem>
                                        <MenuItem value="8 Month">8 Month</MenuItem>
                                        <MenuItem value="9 Month">9 Month</MenuItem>
                                        <MenuItem value="10 Month">10 Month</MenuItem>
                                    </Select>
                                    <FormHelperText>{error.warranty}</FormHelperText>
                                </FormControl>
                            </Grid2>

                            {/* product Price grid*/}
                            <Grid2 size={4}>
                                <TextField
                                    label="Price"
                                    variant="outlined"
                                    fullWidth
                                    onChange={(e) => setPrice(e.target.value)}
                                    value={price}
                                    onFocus={() => handleErrorMessage('price', "")}
                                    error={error.price}
                                    helperText={error.price}
                                />
                            </Grid2>

                            {/* product Offer Price grid*/}
                            <Grid2 size={4}>
                                <TextField
                                    label="Offer Price"
                                    variant="outlined"
                                    fullWidth
                                    onChange={(e) => setOfferPrice(e.target.value)}
                                    value={offerPrice}
                                    onFocus={() => handleErrorMessage('offerPrice', "")}
                                    error={error.offerPrice}
                                    helperText={error.offerPrice}
                                />
                            </Grid2>

                            {/* product Membership Price grid*/}
                            <Grid2 size={4}>
                                <TextField
                                    label="Membership Price"
                                    variant="outlined"
                                    fullWidth
                                    onChange={(e) => setMembershipPrice(e.target.value)}
                                    value={membershipPrice}
                                    onFocus={() => handleErrorMessage('membershipPrice', "")}
                                    error={error.membershipPrice}
                                    helperText={error.membershipPrice}
                                />
                            </Grid2>

                            {/* product Description grid */}
                            <Grid2 size={12}>
                                <ReactQuill theme="snow" value={description} onChange={setDescription} />
                            </Grid2>



                            {/* product condition grid */}
                            <Grid2 size={4}>
                                <FormControl fullWidth error={error.condition}>
                                    <InputLabel id="Condition">Condition</InputLabel>
                                    <Select label="Condition" labelId="Condition" onFocus={() => handleErrorMessage('condition', "")} onChange={(e) => setCondition(e.target.value)} value={condition}>
                                        <MenuItem value="">Select Condition</MenuItem>
                                        <MenuItem value="Fair">Fair</MenuItem>
                                        <MenuItem value="Good">Good</MenuItem>
                                        <MenuItem value="Superb">Superb</MenuItem>
                                    </Select>
                                    <FormHelperText>{error.condition}</FormHelperText>
                                </FormControl>
                            </Grid2>

                            {/* product rating grid*/}
                            <Grid2 size={4}>
                                <TextField
                                    label="Ratings"
                                    variant="outlined"
                                    fullWidth
                                    onChange={(e) => setRatings(e.target.value)}
                                    value={ratings}
                                    onFocus={() => handleErrorMessage('ratings', "")}
                                    error={error.ratings}
                                    helperText={error.ratings}
                                />
                            </Grid2>

                            {/* product Stock grid*/}
                            <Grid2 size={4}>
                                <TextField
                                    label="Stock"
                                    variant="outlined"
                                    fullWidth
                                    onChange={(e) => setStock(e.target.value)}
                                    value={stock}
                                    onFocus={() => handleErrorMessage('stock', "")}
                                    error={error.stock}
                                    helperText={error.stock}
                                />
                            </Grid2>

                            {/* product picture grid*/}
                            <Grid2 size={2} style={{ display: 'flex', alignItems: 'center', justifyContent: "space-between", paddingLeft: 20 }}>
                                <img src={picture.filename} className={classes.image_style} />
                            </Grid2>
                            <Grid2 size={4}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 60, flexDirection: 'column', padding: 10 }}>
                                    <Button fullWidth component="label" variant="outlined">
                                        Upload Picture
                                        <input onClick={() => handleErrorMessage("picture", '')} type="file" accept="image/*" hidden multiple onChange={handlePictureChange} />
                                    </Button>
                                    <div className={classes.helperTextStyle}>{error.picture}</div>
                                </div>
                            </Grid2>

                            {/* product Video grid*/}
                            <Grid2 size={2} style={{ display: 'flex', alignItems: 'center', justifyContent: "space-between", paddingLeft: 40, paddingRight: 40 }}>
                                <img src={video.filename} className={classes.image_style} hidden={video.bytes ? true : false} />
                                <video controls loop autoPlay src={video.filename} className={classes.video_style} hidden={video.bytes ? false : true} />
                            </Grid2>
                            <Grid2 size={4}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 60, flexDirection: 'column', padding: 10 }}>
                                    <Button fullWidth component="label" variant="outlined">
                                        Upload Video
                                        <input onClick={() => handleErrorMessage("video", '')} type="file" accept="video/*" hidden multiple onChange={handleVideoChange} />
                                    </Button>
                                    <div className={classes.helperTextStyle}>{error.video}</div>
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
        </section >
    )
}

export default ProductDetailInterface;