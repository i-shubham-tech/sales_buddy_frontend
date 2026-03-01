import { Typography, Dialog, TextField, Button, Grid2, Radio, RadioGroup, DialogContent, DialogActions } from '@mui/material'
import React, { useRef, useState } from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useSelector } from 'react-redux'
import Address from './Address'
import Swal from 'sweetalert2'

export default function SubmittedAddress({ addressList, fetchAddress }) {
  const [openDialog, setOpenDialog] = useState(false)
  const [openChangeDialog, setOpenChangeDialog] = useState(false)
  const matches = useMediaQuery('(max-width:780px)')
  const [selectedAddress, setSelectedAddress] = useState(addressList[0])
  const [selectAddId, selectSelectAddId] = useState(addressList[0]?.id)
  const addressRef = useRef()
  const user = Object.values(useSelector((state) => state.user))[0];

 



  const handleAddAddress = () => {
    const response = addressRef.current?.handleSubmit();
    if (response) {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Address added successfully",
        toast: true,
        position: "top",

      });
      fetchAddress()
      setOpenDialog(false)
    }
    else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to add address",
        toast: true,
        position: "top",
      });
    }
  }


  const handleChangeAddress = () => {
    setOpenChangeDialog(true)
  }

  const handleConfirmChange = () => {
    const chooseAddress = addressList.filter((addr) => addr?.id == selectAddId)
    setSelectedAddress(chooseAddress[0])
    setOpenChangeDialog(false)
  }

  return (
    <div style={{ background: "#fff", padding: "15px 20px", width: "100%" }}>
      <Typography sx={{ fontWeight: 600, fontSize: 18 }}>Shipping Address</Typography>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Typography fontWeight={600}>{selectedAddress?.addressNickname}</Typography>
        <div style={{ border: "1px solid gray", padding: "2px 10px", borderRadius: 5, fontSize: 14 }}>
          {selectedAddress?.addressType}
        </div>
      </div>
      <Typography>
        {selectedAddress?.address} {selectedAddress?.landmark}   {selectedAddress?.area}   {selectedAddress?.city}   {selectedAddress?.state} {selectedAddress?.pincode}
      </Typography>
      <Typography>Mobile: {user.mobileno}</Typography>

      <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 10 }}>
        <Typography onClick={handleChangeAddress} sx={{ color: "#188466", textDecoration: "underline", cursor: "pointer" }}>Change</Typography>
        <span style={{ borderRight: "1px solid black", height: 15, width: 1 }}></span>
        <Typography onClick={() => setOpenDialog(true)} sx={{ color: "#188466", textDecoration: "underline", cursor: "pointer" }}>Add Address</Typography>
      </div>

      {/* Change Address Dialog */}
      <Dialog open={openChangeDialog} onClose={() => setOpenChangeDialog(false)} maxWidth="md">
        <div style={{ padding: 20, minWidth: matches ? '100%' : 600, boxSizing: "border-box" }}>
          <Typography sx={{ fontWeight: "bold", marginBottom: 2 }}>Select Delivery Address</Typography>
          <RadioGroup
            value={selectAddId}
            onChange={(e) => selectSelectAddId(e.target.value)}
          >
            {addressList.map((addr) => (
              <div key={addr?.id} style={{ border: '1px solid #ddd', padding: 15, marginBottom: 10, borderRadius: 8, display: "flex", gap: 10, alignItems: "center" }}>
                <Radio value={addr?.id} sx={{ padding: 0, height: "25px" }} />
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Typography fontWeight={600}>{addr?.addressNickname}</Typography>
                    <div style={{ border: "1px solid gray", padding: "2px 10px", borderRadius: 5, fontSize: 14 }}>
                      {addr?.addressType}
                    </div>
                  </div>
                  <Typography>
                    {addr?.address}, {addr?.landmark}, {addr?.area}, {addr?.city}, {addr?.state} ({addr?.pincode})
                  </Typography>
                  <Typography>Mobile: {user.mobileno}</Typography>
                </div>
              </div>
            ))}
          </RadioGroup>
          <div style={{ marginTop: 20, display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
            <Button variant="outlined" onClick={() => setOpenChangeDialog(false)}>Cancel</Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleConfirmChange}
            >
              Confirm Change
            </Button>
          </div>
        </div>
      </Dialog>

      {/* Add Address Dialog */}
      <Dialog fullWidth open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md">
        <DialogContent sx={{ padding: 0 }} >
          <Address ref={addressRef} />
        </DialogContent>
        <DialogActions sx={{ marginTop: 3 }}>
          <Button variant="outlined" onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleAddAddress}>
            Add Address
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  )
}
