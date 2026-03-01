import { Grid2, TextField, Button, FormHelperText } from "@mui/material";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useState, useEffect } from "react";
import useStyles from "./ProductInterfaceCss";
import { postAuthData, getAuthData } from "../../backendservices/FetchNodeServices";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function ProductInterface() {
  const navigate = useNavigate();

  const [serviceid, setServiceId] = useState("");
  const [brandid, setBrandId] = useState("");
  const [productid, setProductId] = useState("");
  const [productname, setproductname] = useState("");
  const [productdescription, setProductDescription] = useState("");
  const [productpicture, setProductpicture] = useState({
    filename: "./gadgets.png",
    bytes: "",
  });
  const [error, setError] = useState({});

  const classes = useStyles();

  /***************/
  const [serviceList, setServiceList] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const fetchAllServices = async () => {
    var res = await getAuthData("services/fetch_services");
    if (res.status) {
      setServiceList(res.data);
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

  const handleErrorMessage = (label, errorMesseage) => {
    setError((prev) => ({ ...prev, [label]: errorMesseage }));
  };

  const handleClick = async () => {
    var err = false;
    if (serviceid.length == 0) {
      err = true;
      handleErrorMessage("serviceid", "Pls Insert ServiceId");
    }

    if (brandid.length == 0) {
      err = true;
      handleErrorMessage("brandid", "Pls Insert BrandId ");
    }

    if (productname.length == 0) {
      err = true;
      handleErrorMessage("productname", "Pls Insert productname");
    }

    if (productdescription.length == 0) {
      err = true;
      handleErrorMessage(
        "productdescription",
        "Pls Insert Product Description"
      );
    }

    if (productpicture.bytes.length == 0) {
      err = true;
      handleErrorMessage("brandlogo", "Pls Choose Image");
    }

    if (err == false) {
      var formData = new FormData();

      formData.append("serviceid", serviceid);
      formData.append("brandid", brandid);
      formData.append("productname", productname);
      formData.append("productdescription", productdescription);
      formData.append("productpicture", productpicture.bytes);

      var result = await postAuthData("products/insert_products", formData);

      if (result.status) {
        Swal.fire({
          icon: "success",
          title: "services Register",
          text: result.message,
          toast: true,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "services Register",
          text: result.message,
          toast: true,
        });
      }
    }
  };

  const handleReset = () => {
    setServiceId("");
    setBrandId("");
    setproductname("");
    setProductDescription("");
    setProductpicture({ filename: "./gadgets.png", bytes: "" });
  };

  const handleImageChange = (e) => {
    setProductpicture({
      filename: URL.createObjectURL(e.target.files[0]),
      bytes: e.target.files[0],
    });
  };

  return (
    <div className={classes.root}>
      <div className={classes.box}>
        <div className={classes.title}>
          <div>
            <img src="/logo.png" className={classes.logo_style} />
          </div>
          <div className={classes.title_style}>Add New Products</div>
          <div
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/dashboard/DisplayAllProducts")}
          >
            <img src="/report.png" className={classes.report_style} />
          </div>
        </div>

        <div style={{ margin: 8 }}>
          <Grid2 container spacing={2}>
            <Grid2 size={6}>
              <FormControl fullWidth>
                <InputLabel>Service Id</InputLabel>
                <Select
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
                  onChange={(e) => setBrandId(e.target.value)}
                >
                  <MenuItem>Select Brand</MenuItem>
                  {fillBrands()}
                </Select>
              </FormControl>


            </Grid2>

            <Grid2 size={12}>
              <TextField
                error={error.productname}
                helperText={error.productname}
                onFocus={() => handleErrorMessage("productname", null)}
                value={productname}
                onChange={(e) => {
                  setproductname(e.target.value);
                }}
                fullWidth
                label="Product Name"
              />
            </Grid2>

            <Grid2 size={12}>
              <TextField
                error={error.productdescription}
                helperText={error.productdescription}
                onFocus={() => handleErrorMessage("productdescription", null)}
                fullWidth
                value={productdescription}
                onChange={(e) => {
                  setProductDescription(e.target.value);
                }}
                label="Product Description"
              />
            </Grid2>

            <Grid2
              size={6}
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 20,
                marginBottum: 20,
              }}
            >
              <img
                src={productpicture.filename}
                className={classes.image_style}
              />
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
                  <input type="file" accept="images/*" hidden multiple />
                </Button>
                <div className={classes.helperTextStyle}>{error.brandlogo}</div>
              </div>
            </Grid2>

            <Grid2 size={6} className={classes.center}>
              <Button
                onClick={handleClick}
                className={classes.button_style}
                variant="contained"
              >
                Save
              </Button>
            </Grid2>

            <Grid2 size={6} className={classes.center}>
              <Button
                onClick={handleReset}
                className={classes.button_style}
                variant="contained"
              >
                Reset
              </Button>
            </Grid2>
          </Grid2>
        </div>
      </div>
    </div>
  );
}
