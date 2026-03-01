import { Grid2, FormControl, Select, MenuItem, InputLabel, TextField, Button, FormHelperText } from "@mui/material"
import MaterialTable from "@material-table/core"
import { useState, useEffect } from "react"
import { getAuthData, serverURL } from "../../backendservices/FetchNodeServices"
import Swal from "sweetalert2"
import { postAuthData } from "../../backendservices/FetchNodeServices";
import { useStyles } from "./DisplayAllProductsCss"
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { useNavigate } from "react-router-dom";
//import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export default function DisplayAllProducts() {


  const navigate = useNavigate();
  const classes = useStyles();

  const [serviceid, setServiceId] = useState('')
  const [brandid, setBrandId] = useState('')
  const [productid, setProductId] = useState('')
  const [productname, setProductName] = useState('')
  const [productdescription, setProductDescription] = useState('')
  const [listservices, setListServices] = useState([])
  const [productpicture, setProductPicture] = useState({ filename: 'gadget.png', bytes: '' })
  const [open, setOpen] = useState(false)
  const [error, setError] = useState({})
  const [dailogstate, setDailogstate] = useState("");
  const [oldPicture, setOldPicture] = useState('');
  const [btnstatus, setBtnStatus] = useState(true);

  /***************/
  const [serviceList, setServiceList] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const fetchAllServices = async () => {
    var res = await getAuthData("services/fetch_services");
    if (res.status) {
      setServiceList(res.data);
    }
    else {
      setServiceList([]);
    }

  };
  useEffect(function () {
    fetchAllServices();
  }, []);
  const fillServices = () => {
    return serviceList.map((item) => {
      return (
        <MenuItem value={item.serviceid}>
          {item.servicetype} {item.servicename}
        </MenuItem>
      );
    });
  };

  const fetchAllBrands = async (sid) => {
    var res = await postAuthData("brands/fetch_brands_by_services", {
      serviceid: sid
    });
    if (res.status) {
      setBrandList(res.data);
    }
  };
  const fillBrands = () => {
    return brandList.map((item) => {
      return <MenuItem value={item.brandid}>{item.brandname} </MenuItem>;
    });
  };
  const handleChangeServiceId = (e) => {
    setServiceId(e.target.value);
    fetchAllBrands(e.target.value)

  }

  /*************/

  const handleOpenDailog = (rowData, state) => {
    fetchAllBrands(rowData.serviceid)
    setDailogstate(state);
    setServiceId(rowData.serviceid);
    setBrandId(rowData.brandid);


    setProductId(rowData.productid);
    setProductName(rowData.productname);
    setProductDescription(rowData.productdescription);
    setProductPicture({ filename: `${serverURL}/images/${rowData.productpicture}`, bytes: "" })
    setOldPicture(rowData.productpicture);
    setOpen(true)
  }


  const handleErrorMessage = (label, errorMesseage) => {
    setError((prev) => ({ ...prev, [label]: errorMesseage }))
  }

  const handleClick = async () => {


    var err = false
    if (serviceid.length == 0) {
      err = true
      handleErrorMessage('serviceid', "Pls Insert ServiceId")
    }

    if (brandid.length == 0) {
      err = true
      handleErrorMessage('brandid', "Pls Insert BrandId ")
    }

    if (productname.length == 0) {
      err = true
      handleErrorMessage('productname', "Pls Insert productname")
    }

    if (productdescription.length == 0) {
      err = true
      handleErrorMessage('productdescription', "Pls Insert Product Description")
    }


    if (err == false) {


      var body = {
        "serviceid": serviceid,
        "brandid": brandid,
        "productid": productid,
        "productname": productname,
        "productdescription": productdescription
      };

      var result = await postAuthData('products/edit_products', body);


      if (result.status) {
        Swal.fire({
          icon: "success",
          title: "services Register",
          text: result.message,
          toast: true

        });
        fetchAllProducts()
      }

      else {
        Swal.fire({
          icon: "error",
          title: "services Register",
          text: result.message,
          toast: true,
        });
      }
    }

  }

  const handleReset = () => {
    setServiceId('');
    setBrandId('');
    setProductName('');
    setProductDescription('');
    setProductPicture({ filename: './gadgets.png', bytes: '' })
  }

  const productform = () => {
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
          <Grid2 container spacing={2}>

            <Grid2 size={6}>
              <FormControl fullWidth>
                <InputLabel>Service Id</InputLabel>
                <Select
                  value={serviceid}
                  label="Service Id"
                  onChange={handleChangeServiceId}
                >
                  <MenuItem>Select Service</MenuItem>
                  {fillServices()}
                </Select>
              </FormControl>
            </Grid2>

            <Grid2 size={6}>
              <FormControl fullWidth>
                <InputLabel>Brand Id</InputLabel>
                <Select
                  label="Brand Id"
                  value={brandid}
                  onChange={(e) => setBrandId(e.target.value)}
                >
                  <MenuItem>Select Brand</MenuItem>
                  {fillBrands()}
                </Select>
              </FormControl>


            </Grid2>

            <Grid2 size={12}>
              <TextField error={error.productname} helperText={error.productname} onFocus={() => handleErrorMessage('productname', null)} value={productname} onChange={(e) => { setProductName(e.target.value) }} fullWidth label="Product Name" />
            </Grid2>

            <Grid2 size={12}>
              <TextField error={error.productdescription} helperText={error.productdescription} onFocus={() => handleErrorMessage('productdescription', null)} fullWidth value={productdescription} onChange={(e) => { setProductDescription(e.target.value) }} label="Product Description" />
            </Grid2>


            <Grid2 size={6} className={classes.center}>
              <Button onClick={handleClick} className={classes.button_style} variant="contained">
                Edit
              </Button>
            </Grid2>

            <Grid2 size={6} className={classes.center}>
              <Button onClick={handleReset} className={classes.button_style} variant="contained">
                Reset
              </Button>
            </Grid2>
          </Grid2>
        </div>

      </div>

    );
  }

  const handleCloseDailog = () => {
    setOpen(false)
  }

  const handleImageChange = (e) => {
    setProductPicture({ filename: URL.createObjectURL(e.target.files[0]), bytes: e.target.files[0] })
    setBtnStatus(false);

  }

  const deleteUsingIcon = (rowData) => {

    setProductId(rowData.productid)


    Swal.fire({
      title: "Are You Sure To Delete Selected Service?",
      showCancelButton: true,
      confirmButtonText: "Delete",

    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        handleDelete(rowData.productid);
      }
    });

  }

  const handleDelete = async (productid) => {

    var body = { 'productid': productid }
    var response = await postAuthData('products/delete_products', body);


    if (response.status) {
      Swal.fire({
        icon: "success",
        title: "services Register",
        text: response.message,
        toast: true

      });

      fetchAllProducts()
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

  const fetchAllProducts = async () => {
    var response = await getAuthData('products/fetch_products')

    if (response.status) {
      setListServices(response.data)
    }

    else {
      Swal.fire({
        icon: "error",
        title: "services Register",
        text: response.message,
        toast: true,
      });
    }
  }

  useEffect(function () {

    fetchAllProducts()
  }, [])

  const handleImageSave = async () => {
    var formData = new FormData();
    formData.append("productid", productid);
    formData.append("productpicture", productpicture.bytes);
    var result = await postAuthData('products/update_icon', formData);
    if (result.status) {
      Swal.fire({
        icon: "success",
        title: "services Register",
        text: result.message,
        toast: true

      });
      fetchAllProducts()
    }



    else {
      Swal.fire({
        icon: "error",
        title: "services Register",
        text: result.message,
        toast: true,
      });
    }
  }


  const pictureform = () => {
    return (
      <div className={classes.box_dialog}>
        <div className={classes.title}>
          <div>
            <img src="/logo.png" className={classes.logo_style} />
          </div>
          <div className={classes.title_style}>Add New Products</div>
          <div>
            <img src="/report.png" className={classes.report_style} />
          </div>
        </div>

        <div style={{ margin: 8 }}>
          <Grid2 container spacing={2}>


            <Grid2 size={6} style={{ display: 'flex', justifyContent: 'center', marginTop: 20, marginBottum: 20 }}>
              <img src={productpicture.filename} className={classes.image_style} />
            </Grid2>

            <Grid2 size={6}>
              <div style={{ display: "flex", alignItem: "center", justifyContent: "center", height: 30, marginTop: 25, marginBottom: 10, flexDirection: "column" }}>
                <Button fullWidth onChange={handleImageChange} component="label" variant="outlined">
                  Upload
                  <input type="file" accept="images/*" hidden multiple />
                </Button>
                <div className={classes.helperTextStyle}>{error.brandlogo}</div>
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

  function displayAll() {
    return (
      <MaterialTable style={{ maxHeight: "500px", boxShadow: "none" }}
        title="List Of Product"
        columns={[
          { title: 'ID', field: 'productid' },
          { title: 'Service', render: (rowData) => <div>{rowData.servicetype} {rowData.servicename}</div> },
          { title: 'Brand', field: 'brandname' },
          { title: 'Product Name', field: 'productname' },
          { title: 'Product Description', field: 'productdescription' },
          { title: 'Icon', render: (rowData) => <div style={{ cursor: 'pointer' }} onClick={() => { handleOpenDailog(rowData, 'image') }} ><img src={`${serverURL}/images/${rowData.productpicture}`} style={{ width: 40, height: 40, borderRadius: 8 }} /></div> },

        ]}
        data={listservices}
        actions={[
          {
            icon: 'edit',
            tooltip: 'Edit Services',
            onClick: (event, rowData) => handleOpenDailog(rowData, 'data')
          },

          {
            icon: 'delete',
            tooltip: 'Delete Services',
            onClick: (event, rowData) => deleteUsingIcon(rowData)
          },

          {
            icon: 'add',
            tooltip: 'Add Services',
            isFreeAction: true,
            onClick: (event) => navigate('/dashboard/ProductInterface')
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
          {dailogstate == "data" ? productform() : pictureform()}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDailog}>Close</Button>
        </DialogActions>
      </Dialog>

    </div>
  </div>)

}