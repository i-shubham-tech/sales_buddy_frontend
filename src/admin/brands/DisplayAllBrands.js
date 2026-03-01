import { useState } from "react";
import {
  Grid2,
  TextField,
  Button,
  FormHelperText,
  Dialog,
} from "@mui/material";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import MaterialTable from "@material-table/core";

import { useStyles } from "./DisplayAllBrandsCss";
import Swal from "sweetalert2";
import { useEffect } from "react";
import {
  getAuthData,
  postAuthData,
  serverURL,
} from "../../backendservices/FetchNodeServices";
import { DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { Update } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function DisplayAllBrands() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [serviceList, setServiceList] = useState([]);
  const [brandid, setBrandId] = useState("");
  const [btnStatus, setBtnStatus] = useState(true);
  const [serviceid, setServiceId] = useState("");
  const [brandname, setBrandName] = useState("");
  const [error, setError] = useState({});
  const [listbrands, setListBrands] = useState([]);
  const [brandlogo, setBrandLogo] = useState({
    filename: "/brand.png",
    bytes: "",
  });
  const [open, setopen] = useState(false);
  const [dialogState, setDailogstate] = useState("");
  const [oldPicture, setOldPicture] = useState("");

  const handleImageChange = (e) => {
    setBtnStatus(false);
    setBrandLogo({
      filename: URL.createObjectURL(e.target.files[0]),
      bytes: e.target.files[0],
    });
  };

  const handleErrorMessage = (label, errorMesseage) => {
    setError((prev) => ({ ...prev, [label]: errorMesseage }));
  };

  const handleReset = () => {
    setServiceId("");
    setBrandName("");
  };

  const handleClick = async () => {
    var err = false;
    if (serviceid.length == 0) {
      err = true;
      handleErrorMessage("serviceid", "Pls Input Service Name");
    }

    if (brandname.length == 0) {
      err = true;
      handleErrorMessage("brandname", "Pls Select Service Type");
    }

    if (err == false) {
      var body = {
        brandid: brandid,
        brandname: brandname,
        serviceid: serviceid,
      };
      var response = await postAuthData("brands/edit_brands", body);
      if (response.result) {
        Swal.fire({
          icon: "sucess",
          title: "services Register",
          text: response.message,
          toast: true,
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "services Register",
          text: response.message,
          toast: true,
        });
      }
      fetchAllBrands();
    }
  };

  const fetchAllBrands = async () => {
    var response = await getAuthData("brands/fetch_brands");
    if (response.status) {
      setListBrands(response.data);
    } else {
      Swal.fire({
        icon: "error",
        title: "services Register",
        text: response.message,
        toast: true,
      });
    }
  };

  useEffect(function () {
    fetchAllBrands();
  }, []);

  const deleteUsingIcon = (rowData) => {
    setBrandId(rowData.brandid);
    //alert(rowData.brandid);

    Swal.fire({
      title: "Are You Sure To Delete Selected Service?",
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        handleDelete(rowData.brandid);
      }
    });
  };

  const handleDelete = async (brandid) => {
    alert(brandid);
    var body = { brandid: brandid };

    var result = await postAuthData("brands/delete_brands", body);

    if (result.status) {
      Swal.fire({
        icon: "success",
        title: "services Register",
        text: result.message,
        toast: true,
      });

      fetchAllBrands();
    } else {
      Swal.fire({
        icon: "error",
        title: "services Register",
        text: result.message,
        toast: true,
      });
    }
  };

  const handleOpenDailog = (rowData, state) => {
    setBrandId(rowData.brandid);
    setServiceId(rowData.serviceid);
    setBrandName(rowData.brandname);
    setopen(true);
    setDailogstate(state);
    setBrandLogo({
      filename: `${serverURL}/images/${rowData.brandlogo}`,
      bytes: "",
    });
    setOldPicture(rowData.brandlogo);
  };

  const handleCloseDailog = () => {
    setopen(false);
  };
  const fetchAllServices = async () => {
    var res = await getAuthData("services/fetch_services")
    setServiceList(res.data)

  }
  useEffect(function () {
    fetchAllServices()

  }, [])
  const fillServices = () => {
    return (serviceList.map((item) => {
      return <MenuItem value={item.serviceid}>{item.servicetype} {item.servicename}</MenuItem>

    }))
  }
  const brandsform = () => {
    return (
    
        <div className={classes.box_dialog}>
          <div className={classes.title}>
            <div>
              <img src="/logo.png" className={classes.logo_style} />
            </div>
            <div className={classes.title_style}>Edit Brands</div>
          </div>

          <div style={{ margin: 8 }}>
            <Grid2 container spacing={2}>
              <Grid2 size={12}>
                <FormControl fullWidth>
                  <InputLabel>Service Id</InputLabel>
                  <Select
                    value={serviceid}
                    label="Service Id"
                    onChange={(e) => {
                      setServiceId(e.target.value);
                    }}
                  >
                    <MenuItem>Select Service</MenuItem>
                    {fillServices()}
                  </Select>
                </FormControl>
              </Grid2>

              <Grid2 size={12}>
                <TextField
                  fullWidth
                  value={brandname}
                  error={error.brandname}
                  helperText={error.brandname}
                  onFocus={() => handleErrorMessage("brandname", null)}
                  onChange={(e) => {
                    setBrandName(e.target.value);
                  }}
                  label="Brand Name"
                />
              </Grid2>

              <Grid2 size={6} className={classes.center}>
                <Button
                  onClick={() => handleClick()}
                  className={classes.button_style}
                  variant="contained"
                >
                  Save
                </Button>
              </Grid2>

              <Grid2 size={6} className={classes.center}>
                <Button
                  onClick={() => handleDelete(brandid)}
                  className={classes.button_style}
                  variant="contained"
                >
                  Delete
                </Button>
              </Grid2>
            </Grid2>
          </div>
        </div>
   
    );
  };

  const handleImageSave = async () => {
    var formData = new FormData();
    formData.append("brandid", brandid);
    formData.append("brandlogo", brandlogo.bytes);
    var result = await postAuthData("brands/update_brandlogo", formData);
    if (result.status) {
      Swal.fire({
        icon: "success",
        title: "services Register",
        text: result.message,
        toast: true,
      });
      fetchAllBrands();
    } else {
      Swal.fire({
        icon: "error",
        title: "services Register",
        text: result.message,
        toast: true,
      });
    }
  };

  const handleCancelImageChange = () => {
    setBrandLogo({ filename: `${serverURL}/images/${oldPicture}`, byte: "" });
    setBtnStatus(false);
  };

  const pictureForm = () => {
    return (
     
        <div className={classes.box_dialog}>
          <div className={classes.title}>
            <div>
              <img src="/logo.png" className={classes.logo_style} />
            </div>
            <div className={classes.title_style}>Update Picture</div>
            <div>
              <img src="/report.png" className={classes.report_style} />
            </div>
          </div>

          <div style={{ margin: 8 }}>
            <Grid2 container spacing={2}>
              <Grid2
                size={6}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: 20,
                  marginBottum: 20,
                }}
              >
                <img src={brandlogo.filename} className={classes.image_style} />
              </Grid2>

              <Grid2 size={6}>
                <div
                  style={{
                    display: "flex",
                    alignItem: "center",
                    justifyContent: "center",
                    height: 30,
                    marginTop: 25,
                    marginBottom: 10,
                    flexDirection: "column",
                  }}
                >
                  <Button
                    fullWidth
                    onChange={handleImageChange}
                    component="label"
                    variant="outlined"
                  >
                    Upload
                    <input
                      onFocus={() => handleErrorMessage(brandlogo, "")}
                      type="file"
                      accept="images/*"
                      hidden
                      multiple
                    />
                  </Button>
                  <div className={classes.helperTextStyle}>
                    {error.brandlogo}
                  </div>
                </div>
              </Grid2>

              <Grid2 size={6} className={classes.center}>
                <Button
                  disabled={btnStatus}
                  onClick={handleImageSave}
                  className={classes.button_style}
                  variant="contained"
                >
                  Save
                </Button>
              </Grid2>

              <Grid2 size={6} className={classes.center}>
                <Button
                  disabled={btnStatus}
                  onClick={handleCancelImageChange}
                  className={classes.button_style}
                  variant="contained"
                >
                  Reset
                </Button>
              </Grid2>
            </Grid2>
          </div>
        </div>
     
    );
  };

  const openDailog = () => {
    return (
      <Dialog open={open}>
        <DialogContent>
          {dialogState == "data" ? brandsform() : pictureForm()}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDailog}>Close</Button>
        </DialogActions>
      </Dialog>
    );
  };

  function displayAll() {
    return (
      
            <MaterialTable style={{maxHeight:"500px",boxShadow:"none"}}

        title="List Of Brands"
        columns={[
          { title: "Brand ID", field: "brandid" },
          { title: "Service ID", field: "serviceid" },
          {
            title: "Service Type",
            render: (rowData) => (
              <div>
                {rowData.servicetype} {rowData.servicename}
              </div>
            ),
          },
          { title: "Brand Name", field: "brandname" },
          {
            title: "Brand Icon",
            render: (rowData) => (
              <div
                style={{ cursor: "pointer" }}
                onClick={() => handleOpenDailog(rowData, "image")}
              >
                {" "}
                <img
                  src={`${serverURL}/images/${rowData.brandlogo}`}
                  style={{ width: 50, height: 50, objectFit: 'contain', borderRadius: 8 }}
                />
              </div>
            ),
          },
        ]}
        data={listbrands}
        actions={[
          {
            icon: "edit",
            tooltip: "Edit Services",
            onClick: (event, rowData) => handleOpenDailog(rowData, "data"),
          },

          {
            icon: "delete",
            tooltip: "Delete Services",
            onClick: (event, rowData) => deleteUsingIcon(rowData),
          },

          {
            icon: "add",
            tooltip: "Add Services",
            isFreeAction: true,
            onClick: (event) => navigate("/dashboard/BrandsInterface"),
          },
        ]}
      />
    );
  }

  return (
    <div className={classes.root}>
      <div className={classes.box}>
        {displayAll()}
        {openDailog()}
      </div>
    </div>
  );
}
