import { Button, FormControl, FormHelperText, Grid2, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import { useState } from "react"
import { useStyles } from "./ServicesInterfaceCss"
import { postAuthData } from "../../backendservices/FetchNodeServices"
import Swal from "sweetalert2"
import { useNavigate } from "react-router-dom"
export default function ServicesInterface() {
  const classes = useStyles()
  const navigate = useNavigate()
  const [serviceType, setServiceType] = useState('')
  const [serviceName, setServiceName] = useState('')
  const [serviceStatus, setServiceStatus] = useState('')
  const [image, setImage] = useState({ filename: '/repair.png', bytes: '' })
  const [error, setError] = useState({})

  const handleErrorMessage = (label, errorMessage) => {
    setError((prev) => ({ ...prev, [label]: errorMessage }))
  }

  const handleReset = () => {
    setServiceType('')
    setServiceName('')
    setServiceStatus('')
    setImage({ filename: '/repair.png', bytes: '' })
  }

  const handleClick = async () => {
    var err = false
    if (serviceName.length == 0) {
      err = true
      handleErrorMessage('serviceName', "Pls Input Service Name..")
    }
    if (serviceType.length == 0) {
      err = true
      handleErrorMessage('serviceType', "Pls Select Service Type..")
    }
    if (serviceStatus.length == 0) {
      err = true
      handleErrorMessage('serviceStatus', "Pls Select Service Status..")
    }
    if (image.bytes.length == 0) {
      err = true
      handleErrorMessage('image', "Pls Choose Image..")
    }
    if (err == false) {
      var formData = new FormData()
      formData.append('servicetype', serviceType)
      formData.append('servicename', serviceName)
      formData.append('icon', image.bytes)
      formData.append('servicestatus', serviceStatus)
      var result = await postAuthData('services/insert_services', formData)
      if (result.status) {
        Swal.fire({
          icon: "success",
          title: "Service Register",
          text: result.message,
          toast: true
        });
      }
      else {
        Swal.fire({
          icon: "error",
          title: "Service Register",
          text: result.message,
          toast: true
        });
      }
    }
  }
  const handleImageChange = (e) => {
    setImage({ filename: URL.createObjectURL(e.target.files[0]), bytes: e.target.files[0] })
  }
  return (
    <div className={classes.root}>
      <div className={classes.box}>
        <div className={classes.title}>
          <div>
            <img src="/logo.png" className={classes.logo_style} />
          </div>
          <div className={classes.title_style}>
            Add New Services
          </div>
          <div style={{ cursor: 'pointer' }} onClick={() => navigate("/dashboard/displayallservices")}>
            <img src="/report.png" className={classes.report_style} />
          </div>
        </div>
        <div style={{ margin: 8 }}>
          <Grid2 container spacing={2}>
            <Grid2 size={6} >
              <FormControl error={error.serviceType} onFocus={() => handleErrorMessage('serviceType', null)} fullWidth>
                <InputLabel>Service Type</InputLabel>
                <Select onChange={(e) => setServiceType(e.target.value)} value={serviceType} label="Service Type">
                  <MenuItem value="Buy">Buy</MenuItem>
                  <MenuItem value="Sell">Sell</MenuItem>
                </Select>
                <FormHelperText>{error.serviceType}</FormHelperText>
              </FormControl>

            </Grid2>
            <Grid2 size={6} >
              <TextField value={serviceName} error={error.serviceName} helperText={error.serviceName} onFocus={() => handleErrorMessage('serviceName', null)} onChange={(e) => setServiceName(e.target.value)} label="Service Name" fullWidth />
            </Grid2>
            <Grid2 size={2}>

              <img src={image.filename} className={classes.image_style} />

            </Grid2>
            <Grid2 size={4}  >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 60, flexDirection: 'column' }}>
                <Button fullWidth component="label" variant="outlined">
                  Upload
                  <input onFocus={() => handleErrorMessage(image, '')} onChange={handleImageChange} type="file" accept="image/*" hidden multiple />
                </Button>
                <div className={classes.helperTextStyle}>{error.image}</div>
              </div>
            </Grid2>

            <Grid2 size={6} >
              <FormControl error={error.serviceStatus} onFocus={() => handleErrorMessage('serviceStatus', null)} fullWidth>
                <InputLabel>Service Status</InputLabel>
                <Select value={serviceStatus} onChange={(e) => setServiceStatus(e.target.value)} label="Service Status">
                  <MenuItem value="Continue">Continue</MenuItem>
                  <MenuItem value="Discontinue">Discontinue</MenuItem>

                </Select>
                <FormHelperText>{error.serviceStatus}</FormHelperText>
              </FormControl>

            </Grid2>
            <Grid2 size={6} className={classes.center} >
              <Button className={classes.button_style} variant="contained" onClick={handleClick}>Save</Button>
            </Grid2>

            <Grid2 size={6} className={classes.center} >
              <Button onClick={handleReset} className={classes.button_style} variant="contained">Reset</Button>
            </Grid2>

          </Grid2>
        </div>
      </div>
    </div>)
}