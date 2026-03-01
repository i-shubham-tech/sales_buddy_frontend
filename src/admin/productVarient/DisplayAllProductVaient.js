import { Grid2, FormControl, Select, MenuItem, InputLabel, TextField, Button, FormHelperText } from "@mui/material"
import MaterialTable from "@material-table/core"
import { useState, useEffect } from "react"
import { getAuthData, postAuthData } from "../../backendservices/FetchNodeServices"
import Swal from "sweetalert2"
import { useStyles } from "./DisplayProductVarientCss"
import { Dialog, DialogContent, DialogActions } from "@mui/material";
import { useNavigate } from "react-router-dom";
//import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export default function DisplayAllProductVaient() {


  const navigate = useNavigate();
  const classes = useStyles();

  //backend data state
  const [serviceList, setServiceList] = useState([])
  const [brandList, setBrandList] = useState([])
  const [productList, setProductList] = useState([])
  const [productVarientList, setProductVarientList] = useState([])

  // current data state
  const [serviceId, setServiceId] = useState('')
  const [brandId, setBrandId] = useState('')
  const [productId, setProductId] = useState('')
  const [productVarientId, setProductVarientId] = useState('')
  const [productRam, setProductRam] = useState('')
  const [productStorage, setProductStorage] = useState('')

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
  const fetchAllProductVarient = async () => {
    var res = await getAuthData("productVarients/fetch_productVarients");
    if (res.status) {
      setProductVarientList(res.data);
    }
  };

  // handle dropdown changes
  const handleServiceChange = (e) => {
    setServiceId(e.target.value);
    fetchBrandByService(e.target.value);
  };
  const handleBrandChange = (e) => {
    setBrandId(e.target.value);
    fetchProductByBrand(e.target.value);
  }

  // handle Dialog box functionality
  const handleOpenDailog = async (rowData, state) => {
    await fetchAllServices();
    await fetchBrandByService(rowData.serviceid);
    await fetchProductByBrand(rowData.brandid);
    setDailogstate(state);
    setServiceId(rowData.serviceid);
    setBrandId(rowData.brandid);
    setProductId(rowData.productid);
    setProductVarientId(rowData.productvarientid);
    setProductRam(rowData.productram)
    setProductStorage(rowData.productstorage)
    setOpen(true)
  }
  const handleCloseDailog = () => {
    setOpen(false)
  }

  // Edit Funtionality
  const handleSubmit = async () => {
    const data = {
      productvarientid: productVarientId,
      serviceid: serviceId,
      brandid: brandId,
      productid: productId,
      productram: productRam,
      productstorage: productStorage
    }

    try {
      const response = await postAuthData("productVarients/update_productVarients", data)
      if (response.status) {
        Swal.fire({
          icon: "success",
          title: "Product Varient",
          text: response.message,
          toast: true
        })
        await fetchAllProductVarient()
      }
      else {
        Swal.fire({
          icon: "error",
          title: "Product Varient",
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
  const handleDelete = async (productvid) => {

    var body = { 'productvarientid': productvid }
    var response = await postAuthData('productVarients/delete_productVarients', body);

    if (response.status) {
      Swal.fire({
        icon: "success",
        title: "services Register",
        text: response.message,
        toast: true
      });

      await fetchAllProductVarient()
    }
    else {
      Swal.fire({
        icon: "error",
        title: "services Register",
        text: response.message,
        toast: true
      });

    }
  }
  const deleteUsingIcon = (rowData) => {

    Swal.fire({
      title: "Are You Sure To Delete Selected Product Varient?",
      showCancelButton: true,
      confirmButtonText: "Delete",

    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        handleDelete(rowData.productvarientid);
      }
    });

  }
  const EditForm = () => {
    return (

      <div className={classes.box_dialog}>
        <div className={classes.title}>
          <div>
            <img src="/logo.png" className={classes.logo_style} />
          </div>
          <div className={classes.title_style}>Edit Products Varient</div>
          <div>
            <img src="/report.png" className={classes.report_style} />
          </div>
        </div>

        <div style={{ margin: 8 }}>
          <form className={classes.form_box}>
            <Grid2 container spacing={2}>

              <Grid2 size={6}>
                <FormControl fullWidth>
                  <InputLabel>Service</InputLabel>
                  <Select
                    value={serviceId}
                    label="Service"
                    onChange={handleServiceChange}
                  >
                    {serviceList.map((item) => (
                      <MenuItem key={item.serviceid} value={item.serviceid}>{item.servicetype}{item.servicename}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid2>

              <Grid2 size={6}>
                <FormControl fullWidth>
                  <InputLabel>Brand</InputLabel>
                  <Select
                    label="Brand"
                    value={brandId}
                    onChange={handleBrandChange}
                  >
                    {brandList.map((item) => (
                      <MenuItem key={item.brandid} value={item.brandid}>{item.brandname}</MenuItem>
                    ))}
                  </Select>
                </FormControl>


              </Grid2>
            </Grid2>

            <div>
              <FormControl fullWidth>
                <InputLabel id="product">Product</InputLabel>
                <Select label="Product" labelId="product" onChange={(e) => setProductId(e.target.value)} value={productId}>
                  <MenuItem value="">Select Product</MenuItem>
                  {productList.map((item) => (
                    <MenuItem key={item.productid} value={item.productid}>
                      {item.productname}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            {/* Product Varient */}
            <Grid2 container spacing={2}>
              <Grid2 size={6}>
                <TextField
                  label="Product Ram "
                  variant="outlined"
                  fullWidth
                  value={productRam}
                  onChange={(e) => setProductRam(e.target.value)}
                />
              </Grid2>
              <Grid2 size={6}>
                <TextField
                  label="Product Storage "
                  variant="outlined"
                  fullWidth
                  value={productStorage}
                  onChange={(e) => setProductStorage(e.target.value)}
                />
              </Grid2>
            </Grid2>

            <Grid2 container spacing={2}>
              <Grid2 size={6} className={classes.center}>
                <Button className={classes.button_style} variant="contained" onClick={handleSubmit}>
                  Edit
                </Button>
              </Grid2>

              <Grid2 size={6} className={classes.center}>
                <Button className={classes.button_style} variant="contained" onClick={() => handleDelete(productVarientId)}>
                  DELETE
                </Button>
              </Grid2>
            </Grid2>
          </form>
        </div>

      </div>


    );
  }

  // useEffect to fetch data
  useEffect(() => {
    fetchAllProductVarient()
  }, []);

  // table data component

  function displayAll() {
    return (
      <MaterialTable style={{ maxHeight: "500px", boxShadow: "none" }} title="List Of Product Varient"
        columns={[
          { title: 'ID', field: 'productvarientid' },
          { title: 'Service', render: rowData => rowData.servicetype + " " + rowData.servicename },
          { title: 'Brand', field: 'brandname' },
          { title: 'Product', field: 'productname' },
          { title: 'Product Ram', field: 'productram' },
          { title: 'Product Storage', field: 'productstorage' }
        ]}
        data={productVarientList}
        actions={[
          {
            icon: 'edit',
            tooltip: 'Edit Product varient',
            onClick: (event, rowData) => handleOpenDailog(rowData, 'data')
          },

          {
            icon: 'delete',
            tooltip: 'Delete Product Varient',
            onClick: (event, rowData) => deleteUsingIcon(rowData)
          },

          {
            icon: 'add',
            tooltip: 'Add Product Varient',
            isFreeAction: true,
            onClick: (event) => navigate('/dashboard/ProductVarientInterface')
          }

        ]}
      />
    )
  }

  return (<div className={classes.root}>
    <div className={classes.box}>
      {displayAll()}
      <Dialog open={open} onClose={handleCloseDailog}>
        <DialogContent>
          {dailogstate == "data" ? EditForm() : ""}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDailog}>Close</Button>
        </DialogActions>
      </Dialog>

    </div>
  </div>)

}
