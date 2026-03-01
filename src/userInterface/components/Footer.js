import React, { useState } from 'react';
import {
  Box,
  TextField,
  IconButton,
  InputAdornment,
  useMediaQuery,
  Grid2,
  Typography,
  Divider,
} from '@mui/material';
import { ExpandMore, ArrowForward } from '@mui/icons-material';
// import CopyrightIcon from '@mui/icons-material/CopyrightOutlined';
import ArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {
  Facebook,
  Instagram,
  LinkedIn,
  Twitter,
  YouTube
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation()
  
  const disable = location.pathname.toLowerCase().includes("/dashboard")
  const theme = useTheme();
  const isMobile = useMediaQuery('(max-width:780px)');
  const isTablet = useMediaQuery('(min-width:781px) and (max-width:1023px)');
  const isLaptop = useMediaQuery('(min-width:1024px)');
  const [showLink, setShowLink] = useState(false)
  const [showProduct, setShowProduct] = useState(false)


  const usefulLinks = [
    'About Croma', 'Help And Support', 'FAQs', 'Buying Guide', 'Return Policy',
    'B2B Orders', 'Store Locator', 'E-Waste', 'Franchise Opportunity',
    'Site Map', 'Careers At Croma', 'Terms Of Use', 'Disclaimer', 'Privacy Policy',
    'Unboxed', 'Gift Card', 'Croma E-Star',
  ];

  const products = [
    'Televisions & Accessories', 'Home Appliances', 'Phones & Wearables',
    'Computers & Tablets', 'Kitchen Appliances', 'Audio & Video', 'Health & Fitness',
    'Grooming & Personal Care', 'Cameras & Accessories', 'Smart Devices',
    'Gaming', 'Accessories', 'Top Brands',
  ];


  return (
    <div style={{ background: "#1D1D1D", height: "100%", width: "100%", color: "white",display:disable?"none":"block" }}>
      <Box sx={{ height: "auto", width: isMobile ? "85%" : "90%", maxWidth: "1200px", marginX: "auto", padding: 3 }}>

        <Grid2 container spacing={isTablet ? 4 : 2}>

          <Grid2 size={isTablet ? 12 : isMobile ? 12 : 4} sx={{ display: "flex", justifyContent: isMobile ? "flex-start" : "center", textAlign: isTablet ? "center" : "left" }}>
            <Box sx={{ width: isMobile ? "100%" : "auto" }}>
              <Box>
                <Typography component={"h4"} sx={{ fontWeight: 600 }}>
                  CONNECT WITH US
                </Typography>
                <TextField
                  fullWidth
                  placeholder='Enter Email ID'
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton edge="end" sx={{ color: '#000', background: '#fff' }}>
                          <ArrowForward />
                        </IconButton>
                      </InputAdornment>

                    )
                  }}
                  sx={{
                    background: "#fff",
                    borderRadius: 3,
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        border: 'none',
                      },
                    },
                  }}
                />
              </Box>
              <Box sx={{ display: "flex", justifyContent: isMobile ? "flex-start" : "center", gap: 4, marginTop: 2 }}>
                <YouTube sx={{ fontSize: 30, ":hover": { color: "red" } }} />
                <Facebook sx={{ fontSize: 30, ":hover": { color: "#0097e6" } }} />
                <Instagram sx={{ fontSize: 30, ":hover": { color: "#FC427B" } }} />
                <LinkedIn sx={{ fontSize: 30, ":hover": { color: "#487eb0" } }} />
                <Twitter sx={{ fontSize: 30, ":hover": { color: "#487eb0" } }} />
              </Box>
              <Box sx={{ marginTop: 5, display: isTablet ? "none" : isMobile ? "none" : "block" }}>
                <Typography sx={{ fontSize: 16 }}>
                  © Copyright 2025 Croma. All rights reserved
                </Typography>
              </Box>
              <Divider sx={{ background: "white", marginTop: 3, display: isMobile ? "block" : "none" }} />
            </Box>
          </Grid2>

          <Grid2 sx={{ position: "relative", paddingLeft: isLaptop || isTablet ? 3 : 0 }} size={isTablet ? 6 : isMobile ? 12 : 4}  >
            <Divider orientation="vertical" sx={{ position: "absolute", left: 0, top: 0, background: "white", display: isTablet || isMobile ? 'none' : isLaptop ? "block" : "none" }} />
            <ArrowDownIcon sx={{ position: "absolute", right: 2, top: -10, fontSize: 35, display: showLink || isTablet || isLaptop ? "none" : "inline-block" }} onClick={() => setShowLink(true)} />
            <ArrowUpIcon sx={{ position: "absolute", right: 2, top: -10, fontSize: 35, display: showLink ? "inline-block" : "none" }} onClick={() => setShowLink(false)} />
            <Typography sx={{ fontWeight: 800 }}>Useful Links</Typography>
            <Box sx={{ display: showLink || isTablet || isLaptop ? "block" : "none", marginTop: 1 }}>
              <Grid2 container spacing={2}>
                {
                  usefulLinks.map((item) => {
                    return (
                      <Grid2 size={6}><Typography sx={{ fontSize: 14, fontWeight: 600, cursor: "pointer", ":hover": { color: "#12DAA8" } }}>{item}</Typography></Grid2>
                    )
                  })
                }

              </Grid2>
            </Box>
            <Divider sx={{ background: "white", display: isMobile ? "block" : "none" }} />


          </Grid2>

          <Grid2 sx={{ position: "relative", paddingLeft: isLaptop || isTablet ? 3 : 0 }} size={isTablet ? 6 : isMobile ? 12 : 4} >
            <Divider orientation="vertical" sx={{ position: "absolute", left: 0, top: 0, background: "white", display: isMobile ? "none" : "block" }} />
            <ArrowDownIcon sx={{ position: "absolute", right: 2, top: -10, fontSize: 35, display: showProduct || isTablet || isLaptop ? "none" : "inline-block" }} onClick={() => setShowProduct(true)} />
            <ArrowUpIcon sx={{ position: "absolute", right: 2, top: -10, fontSize: 35, display: showProduct ? "inline-block" : "none" }} onClick={() => setShowProduct(false)} />
            <Typography sx={{ fontWeight: 800 }}>Products</Typography>
            <Box sx={{ display: showProduct || isTablet || isLaptop ? "block" : "none", marginTop: 1 }}>
              <Grid2 container spacing={2}>
                {
                  products.map((item) => {
                    return (
                      <Grid2 size={6}><Typography sx={{ fontSize: 14, fontWeight: 600, cursor: "pointer", ":hover": { color: "#12DAA8" } }}>{item}</Typography></Grid2>
                    )
                  })
                }


              </Grid2>
            </Box>
            <Divider sx={{ background: "white", display: isMobile ? "block" : "none" }} />
          </Grid2>

          <Grid2 size={12} sx={{ display: isTablet ? "block" : isMobile ? "block" : "none" }}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Typography sx={{ fontSize: 16 }}>
                © Copyright 2025 Croma. All rights reserved
              </Typography>
            </Box>

          </Grid2>

        </Grid2>

      </Box>


    </div >
  )
}
export default Footer