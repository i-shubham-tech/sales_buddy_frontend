import { Grid2, FormControl, Select, MenuItem, InputLabel, TextField, Button, FormHelperText } from "@mui/material"
import MaterialTable from "@material-table/core"
import { useState, useEffect } from "react"
import { getAuthData, postAuthData, serverURL } from "../../backendservices/FetchNodeServices"
import Swal from "sweetalert2"
import { useStyles } from "./DisplayProductDetailCss"
import { Dialog, DialogContent, DialogActions } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill-new";

//import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export default function DisplayAllProductDetail() {


  const navigate = useNavigate();
  const classes = useStyles();

  //backend data for table display
  const [productDetailList, setProductDetailList] = useState([])

  // backend data for dropdown for edit form
  const [serviceList, setServiceList] = useState([])
  const [brandList, setBrandList] = useState([])
  const [productList, setProductList] = useState([])
  const [productColorList, setproductColorList] = useState([])
  const [productVarientList, setProductVarientList] = useState([])


  // current edit form data state
  const [productDetailId, setProductDetailId] = useState('')
  const [serviceId, setServiceId] = useState('')
  const [brandId, setBrandId] = useState('')
  const [productId, setProductId] = useState('')
  const [productColorId, setProductColorId] = useState("")
  const [productVarientId, setProductVarientId] = useState("")
  const [imei, setImei] = useState("")
  const [productStatus, setProductStatus] = useState("")
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
  const [error, setError] = useState({})

  // edit picture state
  const [currentPicture, setCurrentPicture] = useState({ filename: "", bytes: '' })
  const [currentvideo, setCurrentVideo] = useState({ filename: "", bytes: '' })



  // dailog box state
  const [open, setOpen] = useState(false)
  const [dailogstate, setDailogstate] = useState("");

  // fetech data from backend
  const fetchAllServices = async () => {
    var res = await getAuthData("services/fetch_services");
    if (res.status) {
      setServiceList(res.data);
    }
  };
  const fetchBrandByService = async (service_id) => {
    var res = await postAuthData("brands/fetch_brands_by_services", { serviceid: service_id });
    if (res.status) {
      setBrandList(res.data);
    }
  };
  const fetchProductByBrand = async (brand_id) => {
    var res = await postAuthData("products/fetch_product_by_brand", { brandid: brand_id });
    if (res.status) {
      setProductList(res.data);
    }
  };
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
        setProductDetailList(response.data)
      }
    } catch (error) {
      console.log("Error in product_Color jsx fetching api- ", error)
    }
  }


  // handle dropdown changes
  const handleServiceChange = (e) => {
    setServiceId(e.target.value);
    fetchBrandByService(e.target.value);
  };
  const handleBrandChange = (e) => {
    setBrandId(e.target.value);
    fetchProductByBrand(e.target.value);
  }
  const handleProductChange = async (e) => {
    setProductId(e.target.value)
    await fetchProductColorByProductId(e.target.value)
    await fetchProductVarientByProductId(e.target.value)

  }

  // handle Dialog box functionality
  const handleOpenDailog = async (rowData, state) => {
    setProductDetailId(rowData.productdetailid);
    setOpen(true)
    setDailogstate(state);
    if (state === "picture") {
      setpicture({ filename: rowData.picture, bytes: '' })
      return;
    }
    if (state === "video") {
      setVideo({ filename: rowData.video, bytes: '' })
      return;
    }
    await fetchAllServices();
    await fetchBrandByService(rowData.serviceid);
    await fetchProductByBrand(rowData.brandid);
    await fetchProductColorByProductId(rowData.productid)
    await fetchProductVarientByProductId(rowData.productid)
    setServiceId(rowData.serviceid);
    setBrandId(rowData.brandid);
    setProductId(rowData.productid);
    setProductColorId(rowData.productcolorid);
    setProductVarientId(rowData.productvarientid);
    setImei(rowData.imei);
    setProductStatus(rowData.productstatus);
    setWarranty(rowData.warranty);
    setPrice(rowData.price);
    setOfferPrice(rowData.offerprice);
    setMembershipPrice(rowData.membershipprice);
    setDescription(rowData.description);
    setCondition(rowData.condition);
    setRatings(rowData.ratings);
    setStock(rowData.stock);
  }
  const handleCloseDailog = () => {
    setOpen(false)
  }

  // handle Errror message
  const handleErrorMessage = (label, errorMessage) => {
    setError((prev) => ({ ...prev, [label]: errorMessage }))
  }

  // Edit Form Funtionality
  const handleSubmit = async () => {
    const data = {
      productdetailid: productDetailId,
      serviceid: serviceId,
      brandid: brandId,
      productid: productId,
      productcolorid: productColorId,
      productvarientid: productVarientId,
      imei: imei,
      productstatus: productStatus,
      warranty: warranty,
      price: price,
      offerprice: offerPrice,
      membershipprice: membershipPrice,
      description: description,
      condition: condition,
      ratings: ratings,
      stock: stock
    }

    try {
      const response = await postAuthData("productdetails/update_productdetails", data)
      console.log(response)
      if (response.status) {
        Swal.fire({
          icon: "success",
          title: "Product Detail",
          text: response.message,
          toast: true
        })
        await fetchProductDetails()
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
  const handleDelete = async (productdid) => {

    var body = { 'productdetailid': productdid }
    var response = await postAuthData('productdetails/delete_productdetails', body);

    if (response.status) {
      Swal.fire({
        icon: "success",
        title: "Delete Product Detail",
        text: response.message,
        toast: true
      });

      await fetchProductDetails()
    }
    else {
      Swal.fire({
        icon: "success",
        title: "Delete Product Detail",
        text: response.message,
        toast: true
      });

    }
  }
  const deleteUsingIcon = (rowData) => {

    Swal.fire({
      title: "Are You Sure Want To Delete Selected Product Detail?",
      showCancelButton: true,
      confirmButtonText: "Delete",

    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        handleDelete(rowData.productdetailid);
      }
    });

  }
  // edit data form
  const EditForm = () => {
    return (
      <div className={classes.box_dialog}>
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
              onClick={() => { navigate("/DisplayAllProductVarient") }}
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
              <Grid2 size={6}>
                <FormControl fullWidth error={error.productColorId}>
                  <InputLabel id="product color">Product Color</InputLabel>
                  <Select label="Product Color" labelId="product color" onFocus={() => handleErrorMessage('productColorId', "")} onChange={(e) => setProductColorId(e.target.value)} value={productColorId}>
                    <MenuItem value="">Select Product Color</MenuItem>
                    {productColorList.map((item) => (
                      <MenuItem key={item.productcolorid} value={item.productcolorid}>
                        {item.productcolor}
                      </MenuItem>
                    ))}
                  </Select>
                  <FormHelperText>{error.productColorId}</FormHelperText>
                </FormControl>
              </Grid2>

              {/* productVarient grid */}
              <Grid2 size={6}>
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

              {/* product imei no */}
              <Grid2 size={4}>
                <TextField
                  label="IMEI No"
                  variant="outlined"
                  fullWidth
                  onChange={(e) => setImei(e.target.value)}
                  value={imei}
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
                <TextField
                  label="Warranty"
                  variant="outlined"
                  fullWidth
                  onChange={(e) => setWarranty(e.target.value)}
                  value={warranty}
                  onFocus={() => handleErrorMessage('warranty', "")}
                  error={error.warranty}
                  helperText={error.warranty}
                />
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










            </Grid2>







            {/* Buttons */}
            <Grid2 container spacing={2}>
              <Grid2 size={6}>

                <Button type="button" variant="contained" fullWidth className={classes.button_style} onClick={handleSubmit}>
                  Submit
                </Button>
              </Grid2>
              <Grid2 size={6}>
                <Button type="reset" variant="contained" fullWidth className={classes.button_style} onClick={() => handleDelete(productDetailId)}>
                  Delete
                </Button>
              </Grid2>
            </Grid2>
          </form>
        </div>
      </div>

    );
  }
  // edit picture form
  const pictureForm = () => {
    const btnstatus = currentPicture.filename === '' ? true : false;


    const handleImageChange = (e) => {
      const file = e.target.files[0];
      setCurrentPicture({ filename: URL.createObjectURL(file), bytes: file });
    }

    const handleReset = () => {
      setCurrentPicture({ filename: '', bytes: '' });
    }
    const handleImageSave = async () => {
      const formData = new FormData();
      formData.append("productdetailid", productDetailId)
      formData.append("picture", currentPicture.bytes)

      var response = await postAuthData('productdetails/update_productdetails_picture', formData, true);
      if (response.status) {
        Swal.fire({
          icon: "success",
          title: "Product Detail",
          text: response.message,
          toast: true
        })
        await fetchProductDetails()
        handleReset()
        setTimeout(() => {
          handleCloseDailog()
        }, 2000)

      }
      else {


      }
    }
    return (
      <div className={classes.box_dialog}>
        <div className={classes.title}>
          <div>
            <img src="/logo.png" className={classes.logo_style} />
          </div>
          <div className={classes.title_style}>Edit Image</div>
        </div>

        <div style={{ margin: 8 }}>
          <Grid2 container spacing={2}>
            <Grid2 size={6} style={{ display: 'flex', justifyContent: 'center', marginTop: 20, marginBottum: 20 }}>
              <img src={currentPicture.filename || `${serverURL}/images/${picture.filename}`} className={classes.image_style} />
            </Grid2>

            <Grid2 size={6}>
              <div style={{ display: "flex", alignItem: "center", justifyContent: "center", height: 30, marginTop: 25, marginBottom: 10, flexDirection: "column" }}>
                <Button fullWidth onChange={handleImageChange} component="label" variant="outlined">
                  Upload
                  <input type="file" accept="images/*" hidden multiple />
                </Button>
                <div></div>
              </div>
            </Grid2>



            <Grid2 size={6} className={classes.center}>
              <Button disabled={btnstatus} onClick={handleImageSave} className={classes.button_style} variant="contained">
                Save
              </Button>
            </Grid2>

            <Grid2 size={6} className={classes.center}>
              <Button disabled={btnstatus} onClick={handleReset} className={classes.button_style} variant="contained">
                Reset
              </Button>
            </Grid2>
          </Grid2>
        </div>

      </div>


    );
  }
  // edit video form
  const videoForm = () => {
    const btnstatus = currentvideo.filename === '' ? true : false;

    const handleVideoChange = (e) => {
      const file = e.target.files[0];
      setCurrentVideo({ filename: URL.createObjectURL(file), bytes: file });
    }

    const handleReset = () => {
      setCurrentVideo({ filename: '', bytes: '' });
    }

    const handleVideoSave = async () => {
      const formData = new FormData();
      formData.append("productdetailid", productDetailId)
      formData.append("video", currentvideo.bytes)

      var response = await postAuthData('productdetails/update_productdetails_video', formData, true);
      if (response.status) {
        Swal.fire({
          icon: "success",
          title: "Product Detail",
          text: response.message,
          toast: true
        })
        await fetchProductDetails()
        handleReset()
        setTimeout(() => {
          handleCloseDailog()
        }, 2000)

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
    return (
      <div className={classes.box_dialog}>
        <div className={classes.title}>
          <div>
            <img src="/logo.png" className={classes.logo_style} />
          </div>
          <div className={classes.title_style}>Edit Video</div>
        </div>

        <div style={{ margin: 8 }}>
          <Grid2 container spacing={2}>
            <Grid2 size={6} style={{ display: 'flex', justifyContent: 'center', marginTop: 20, marginBottum: 20 }}>
              <video src={currentvideo.filename || `${serverURL}/images/${video.filename}`} className={classes.image_style} />
            </Grid2>

            <Grid2 size={6}>
              <div style={{ display: "flex", alignItem: "center", justifyContent: "center", height: 30, marginTop: 25, marginBottom: 10, flexDirection: "column" }}>
                <Button fullWidth onChange={handleVideoChange} component="label" variant="outlined">
                  Upload
                  <input type="file" accept="images/*" hidden multiple />
                </Button>
                <div></div>
              </div>
            </Grid2>



            <Grid2 size={6} className={classes.center}>
              <Button disabled={btnstatus} onClick={handleVideoSave} className={classes.button_style} variant="contained">
                Save
              </Button>
            </Grid2>

            <Grid2 size={6} className={classes.center}>
              <Button disabled={btnstatus} onClick={handleReset} className={classes.button_style} variant="contained">
                Reset
              </Button>
            </Grid2>
          </Grid2>
        </div>

      </div>


    );
  }


  //      return(
  //             <div className={classes.root} >
  //             <div className={classes.box}>
  //                 <div className={classes.title}>
  //                     <div>
  //                         <img src="/logo.png" className={classes.logo_style} />
  //                     </div>
  //                     <div className={classes.title_style}>Add New Products</div>
  //                     <div>
  //                         <img src="/report.png" className={classes.report_style} />
  //                     </div>
  //                 </div>

  //                 <div style={{ margin: 8 }}>
  //                           <Grid2 container spacing={2}>


  //                             <Grid2 size={6} style={{display:'flex' , justifyContent:'center', marginTop:20, marginBottum:20} }>
  //                               <img src={productpicture.filename}  className={classes.image_style} />
  //                             </Grid2>

  //                             <Grid2 size={6}>
  //                               <div style={{ display: "flex", alignItem: "center", justifyContent: "center", height: 30, marginTop:25,marginBottom:10,flexDirection:"column"}}>
  //                                 <Button fullWidth onChange={handleImageChange} component="label" variant="outlined">
  //                                   Upload
  //                                   <input   type="file" accept="images/*" hidden multiple />
  //                                 </Button>
  //                                 <div className={classes.helperTextStyle}>{error.brandlogo}</div>
  //                               </div>
  //                             </Grid2>



  //                             <Grid2 size={6} className={classes.center}>
  //                               <Button disabled={btnstatus} onClick={handleImageSave} className={classes.button_style} variant="contained">
  //                                 Save
  //                               </Button>
  //                             </Grid2>

  //                             <Grid2 size={6} className={classes.center}>
  //                               <Button disabled={btnstatus} onClick={handleReset} className={classes.button_style} variant="contained">
  //                                 Reset
  //                               </Button>
  //                             </Grid2>
  //                           </Grid2>
  //                         </div>

  //             </div>
  //         </div>

  //         );
  //   }


  // useEffect to fetch data
  useEffect(() => {
    fetchProductDetails()
  }, []);

  // table data component

  function displayAll() {
    return (
      <MaterialTable style={{ maxHeight: "700px", boxShadow: "none" }} title="List Of Product Details"
        columns={[
          { title: 'ID', field: 'productdetailid' },
          { title: 'Service', render: rowData => rowData.servicetype + " " + rowData.servicename },
          { title: 'Product', render: rowData => `${rowData.brandname} ${rowData.productname}  ${rowData.productcolorname} ${rowData.productram}/${rowData.productstorage}` },
          { title: 'IMEI NO', field: 'imei' },
          { title: 'Product Status', render: rowData => `${rowData.productstatus} ${rowData.condition}  ${rowData.warranty}` },
          { title: 'Status', field: 'status' },
          { title: 'Price', render: rowData => `price:${rowData.price} offerprice:${rowData.offerprice}  membership:${rowData.membershipprice}` },
          { title: 'Ratings', field: 'ratings' },
          { title: 'Stock', field: 'stock' },
          { title: 'Picture', render: rowData => <img src={`${serverURL}/images/${rowData.picture}`} className={classes.image_style} title="Edit Image" onClick={() => handleOpenDailog(rowData, 'picture')} /> },
          { title: 'Video', render: rowData => <video src={`${serverURL}/images/${rowData.video}`} className={classes.video_style} title="Edit Video" onClick={() => handleOpenDailog(rowData, 'video')} /> },


        ]}
        data={productDetailList}
        actions={[
          {
            icon: 'edit',
            tooltip: 'Edit Product Details',
            onClick: (event, rowData) => handleOpenDailog(rowData, 'data')
          },

          {
            icon: 'delete',
            tooltip: 'Delete Product Varient',
            onClick: (event, rowData) => deleteUsingIcon(rowData)
          },

          {
            icon: 'add',
            tooltip: 'Add Product Detail',
            isFreeAction: true,
            onClick: (event) => navigate('/dashboard/ProductDetailInterface')
          }

        ]}
      />
    )
  }

  return (
    <div className={classes.root}>
      <div className={classes.box}>
        {displayAll()}
        <Dialog open={open} onClose={handleCloseDailog}>
          <DialogContent>
            {dailogstate == "data" ? EditForm() : dailogstate == "picture" ? pictureForm() : videoForm()}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDailog}>Close</Button>
          </DialogActions>
        </Dialog>

      </div>
    </div>)

}
