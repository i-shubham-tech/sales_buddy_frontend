import MaterialTable from "@material-table/core"
import { useState, useEffect } from "react"
import { getAuthData, postAuthData, serverURL } from "../../backendservices/FetchNodeServices"
import Swal from "sweetalert2"
import { useStyles } from "./DisplayAllBannerCss"
import { useNavigate } from "react-router-dom";
//import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export default function DisplayAllBannerInterface() {


  const navigate = useNavigate();
  const classes = useStyles();

  const [bannerList, setBannerList] = useState([])



  const fetchAllBanner = async () => {
    var res = await getAuthData("banner/fetch_banner");
    if (res.status) {
      setBannerList(res.data)
    }
  };

  const handleDelete = async (bannerid) => {

    var body = { 'bannerid': bannerid }
    var response = await postAuthData('banner/delete_banner', body);

    if (response.status) {
      Swal.fire({
        icon: "success",
        title: "delete banner",
        text: response.message,
        toast: true
      });

      await fetchAllBanner()
    }
    else{
      Swal.fire({
        icon: "error",
        title: "delete banner",
        text: response.message,
        toast: true
      });

    }
  }
  const deleteBanner = (bannerid) => {
    Swal.fire({
      title: "Are You Sure To Delete Selected Banner?",
      showCancelButton: true,
      confirmButtonText: "Delete",

    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        handleDelete(bannerid);
      }
    });

  }


  // useEffect to fetch data
  useEffect(() => {
    fetchAllBanner()
  }, []);

  // table data component

  function displayAll() {
    return (
      <MaterialTable style={{ maxHeight: "500px", boxShadow: "none" }} title="List Of Banner"
        columns={[
          { title: 'ID', field: 'bannerid' },
          { title: 'product', render: rowData => <div>{rowData.brandname} {rowData.productname} {rowData.productcolorname}({rowData.productram}/{rowData.productstorage})</div> },
          { title: 'BannerImage', render: rowData => <img src={`${serverURL}/images/${rowData.bannerImage}`} style={{ width: 80, height: 80, borderRadius: 8 }} /> },
        ]}
        data={bannerList}
        actions={[
          {
            icon: 'delete',
            tooltip: 'Delete Banner',
            onClick: (event, rowData) => deleteBanner(rowData.bannerid)
          },

          {
            icon: 'add',
            tooltip: 'Add Banner',
            isFreeAction: true,
            onClick: (event) => navigate('/dashboard/BannerInterface')
          }

        ]}
      />
    )
  }

  return (
    <div className={classes.root}>
      <div className={classes.box}>
        {displayAll()}
      </div>
    </div>)

}
