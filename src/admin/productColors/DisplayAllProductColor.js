import { Grid2, FormControl, Select, MenuItem, InputLabel, TextField, Button, FormHelperText } from "@mui/material"
import MaterialTable from "@material-table/core"
import { useState, useEffect } from "react"
import { getAuthData, postAuthData } from "../../backendservices/FetchNodeServices"
import Swal from "sweetalert2"
import { useStyles } from "./DisplayProductColorCss"
import { Dialog, DialogContent, DialogActions } from "@mui/material";
import { useNavigate } from "react-router-dom";
//import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export default function DisplayAllProductColor() {


  const navigate = useNavigate();
  const classes = useStyles();

  const [serviceList, setServiceList] = useState([])
  const [brandList, setBrandList] = useState([])
  const [productList, setProductList] = useState([])
  const [productColorList, setProductColorList] = useState([])
  const [serviceId, setServiceId] = useState('')
  const [brandId, setBrandId] = useState('')
  const [productId, setProductId] = useState('')
  const [productColorId, setProductColorId] = useState('')
  const [productColor, setProductColor] = useState('')
  const [productColorName, setProductColorName] = useState('')
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
  const fetchAllProductColor = async (brand_id) => {
    var res = await getAuthData("productColors/fetch_productColors");
    if (res.status) {
      setProductColorList(res.data);
    }
  };

  // handle changes
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
    await fetchBrandByService(rowData.serviceid)
    await fetchProductByBrand(rowData.brandid);
    setDailogstate(state);
    setServiceId(rowData.serviceid);
    setBrandId(rowData.brandid);
    setProductId(rowData.productid);
    setProductColor(rowData.productcolor)
    setProductColorName(rowData.productcolorname);
    setProductColorId(rowData.productcolorid);
    setOpen(true)
  }
  const handleCloseDailog = () => {
    setOpen(false)
  }

  // Edit Funtionality
  const handleSubmit = async (e) => {
    const body = {
      productcolorid: productColorId,
      serviceid: serviceId,
      brandid: brandId,
      productid: productId,
      productcolor: productColor,
      productcolorname: productColorName
    }

    try {
      const response = await postAuthData("productColors/update_productColors", body)
      if (response.status) {
        Swal.fire({
          icon: "success",
          title: "Product Color",
          text: response.message,
          toast: true
        })
        await fetchAllProductColor()
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
        text: error.response.data.message,
        toast: true
      })

    }

  }
  const handleDelete = async (productcid) => {

    var body = { 'productcolorid': productcid }
    var response = await postAuthData('productColors/delete_productColors', body);

    if (response.status) {
      Swal.fire({
        icon: "success",
        title: "services Register",
        text: response.message,
        toast: true
      });

      await fetchAllProductColor()
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

    setProductColorId(rowData.productcolorid);
    Swal.fire({
      title: "Are You Sure To Delete Selected Service?",
      showCancelButton: true,
      confirmButtonText: "Delete",

    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        handleDelete(rowData.productcolorid);
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
          <div className={classes.title_style}>Edit Products</div>
          <div>
            <img src="/report.png" className={classes.report_style} />
          </div>
        </div>

        <div style={{ margin: 8 }}>
          <form className={classes.form_box}>
            <Grid2 container spacing={2}>

              <Grid2 size={6}>
                <FormControl fullWidth>
                  <InputLabel>Service Id</InputLabel>
                  <Select
                    value={serviceId}
                    label="Service Id"
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
                  <InputLabel>Brand Id</InputLabel>
                  <Select
                    label="Brand Id"
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

            {/* Color Code & name */}
            <Grid2 container spacing={2}>
              <Grid2 size={6}>
                <div>
                  <TextField
                    label="Product Color Code"
                    variant="outlined"
                    fullWidth
                    value={productColor}
                    onChange={(e) => setProductColor(e.target.value)}
                  />
                </div>
              </Grid2>
              <Grid2 size={6}>
                <div>
                  <TextField
                    label="Product Color Name"
                    variant="outlined"
                    fullWidth
                    value={productColorName}
                    onChange={(e) => setProductColorName(e.target.value)}
                  />
                </div>
              </Grid2>
            </Grid2>


            <Grid2 container spacing={2}>
              <Grid2 size={6} className={classes.center}>
                <Button className={classes.button_style} variant="contained" onClick={handleSubmit}>
                  Edit
                </Button>
              </Grid2>

              <Grid2 size={6} className={classes.center}>
                <Button className={classes.button_style} variant="contained">
                  Reset
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
    fetchAllServices();
    fetchAllProductColor()
  }, []);

  // table data component

  function displayAll() {
    return (
      <MaterialTable style={{ maxHeight: "500px", boxShadow: "none" }} title="List Of Product Color"
        columns={[
          { title: 'ID', field: 'productcolorid' },
          { title: 'Service', render: rowData => rowData.servicetype + " " + rowData.servicename },
          { title: 'Brand', field: 'brandname' },
          { title: 'Product', field: 'productname' },
          { title: 'Product Color Name', field: 'productcolorname' },
          { title: 'Product Color Code', render: rowData => <div style={{ padding: 2, border: "2px solid #2C3A47", width: 30, height: 30, borderRadius: 30 }}> <div style={{ backgroundColor: rowData.productcolor, width: 30, height: 30, borderRadius: 30 }}></div></div> },


        ]}
        data={productColorList}
        actions={[
          {
            icon: 'edit',
            tooltip: 'Edit Product Color',
            onClick: (event, rowData) => handleOpenDailog(rowData, 'data')
          },

          {
            icon: 'delete',
            tooltip: 'Delete Product Color',
            onClick: (event, rowData) => deleteUsingIcon(rowData)
          },

          {
            icon: 'add',
            tooltip: 'Add Product Color',
            isFreeAction: true,
            onClick: (event) => navigate('/dashboard/ProductColorInterface')
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
            {dailogstate == "data" ? EditForm() : ""}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDailog}>Close</Button>
          </DialogActions>
        </Dialog>

      </div>
    </div>)

}
