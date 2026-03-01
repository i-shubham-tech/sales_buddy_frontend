import { Grid2, TextField, Button, FormHelperText } from "@mui/material";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import useStyles from "./BrandInterfaceCss";
import { getAuthData, postAuthData } from "../../backendservices/FetchNodeServices";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function BrandsInterface() {

  const navigate = useNavigate();
  const classes = useStyles();
  const [serviceList, setServiceList] = useState([]);
  const [serviceid, setServiceId] = useState('');
  const [brandname, setBrandName] = useState('');
  const [brandlogo, setBrandLogo] = useState({ filename: "/brand.png", bytes: "" })
  const [error, setError] = useState({})
  const fetchAllServices = async () => {
    var res = await getAuthData("services/fetch_services")
    if(res.status){
      setServiceList(res.data)

    }
    else{
      setServiceList([])
    }

  }
  useEffect(function () {
    fetchAllServices()

  }, [])
  const fillServices = () => {
    return (serviceList.map((item) => {
      return <MenuItem value={item.serviceid}>{item.servicetype} {item.servicename}</MenuItem>

    }))
  }

  const handleErrorMessage = (label, errorMesseage) => {
    setError((prev) => ({ ...prev, [label]: errorMesseage }))
  }

  const handleReset = () => {
    setServiceId('');
    setBrandName('');
    setBrandLogo({ filename: './/brand.png', bytes: '' })
  }

  const handleClick = async () => {

    var err = false
    if (serviceid.length == 0) {
      err = true
      handleErrorMessage('serviceid', "Pls Input Service Name")
    }

    if (brandname.length == 0) {
      err = true
      handleErrorMessage('brandname', "Pls Select Service Type")
    }

    if (brandlogo.bytes.length == 0) {
      err = true
      handleErrorMessage('brandlogo', "Pls Choose Image")
    }

    if (err == false) {

      var formData = new FormData();

      formData.append("serviceid", serviceid);
      formData.append("brandname", brandname);
      formData.append("brandlogo", brandlogo.bytes)

      var result = await postAuthData("brands/insert_brands", formData);

      if (result.status) {
        Swal.fire({
          icon: "success",
          title: "Add Brand",
          text: result.message,
          toast: true

        });
      }

      else {
        Swal.fire({
          icon: "error",
          title: "Add Brand",
          text: result.message,
          toast: true,
        });
      }

    }

  }


  const handleImageChange = (e) => {
    setBrandLogo({ filename: URL.createObjectURL(e.target.files[0]), bytes: e.target.files[0] })
  }

  return (

    <div className={classes.root} >
      <div className={classes.box}>
        <div className={classes.title}>
          <div>
            <img src="/logo.png" className={classes.logo_style} />
          </div>
          <div className={classes.title_style}>Add New Brands</div>
          <div style={{ cursor: 'pointer' }} onClick={() => navigate('/dashboard/DisplayAllBrands')} >
            <img src="/report.png" className={classes.report_style} />
          </div>
        </div>

        <div style={{ margin: 8 }}>
          <Grid2 container spacing={2}>

            <Grid2 size={12}>

              <FormControl fullWidth>
                <InputLabel>Service Id</InputLabel>
                <Select label="Service Id" onChange={(e) => { setServiceId(e.target.value) }}>
                  <MenuItem>Select Service</MenuItem>
                  {fillServices()}
                </Select>
              </FormControl>
            </Grid2>

            <Grid2 size={12}>
              <TextField fullWidth value={brandname} error={error.brandname} helperText={error.brandname} onFocus={() => handleErrorMessage('brandname', null)} onChange={(e) => { setBrandName(e.target.value) }} label="Brand Name" />
            </Grid2>

            <Grid2 size={6} style={{ display: 'flex', justifyContent: 'center', marginTop: 20, marginBottum: 20 }}>
              <img src={brandlogo.filename} className={classes.image_style} />
            </Grid2>

            <Grid2 size={6}>
              <div style={{ display: "flex", alignItem: "center", justifyContent: "center", height: 30, marginTop: 25, marginBottom: 10, flexDirection: "column" }}>
                <Button fullWidth onChange={handleImageChange} component="label" variant="outlined">
                  Upload
                  <input onFocus={() => handleErrorMessage(brandlogo, '')} type="file" accept="images/*" hidden multiple />
                </Button>
                <div className={classes.helperTextStyle}>{error.brandlogo}</div>
              </div>
            </Grid2>



            <Grid2 size={6} className={classes.center}>
              <Button onClick={handleClick} className={classes.button_style} variant="contained">
                Save
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
    </div>


  );


}