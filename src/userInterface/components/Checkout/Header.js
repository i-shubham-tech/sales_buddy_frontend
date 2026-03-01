// Import necessary dependencies from Material-UI and React
import * as React from 'react';
import { AppBar, Box, Toolbar, Typography, IconButton, Badge, Button } from '@mui/material';
import { Menu as MenuIcon, ShoppingCart as ShoppingCartIcon, Edit as EditIcon, Person as PersonIcon, Room as LocationIcon } from '@mui/icons-material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useLocation, useNavigate } from 'react-router-dom';


export default function Header() {
    const matches = useMediaQuery('(max-width:550px)');
    const location = useLocation()
    const isShipping = location.pathname.includes("/checkout")
    const navigate = useNavigate()

    return (
        <Box>

            {/* Main Header Container */}
            <AppBar position='fixed' sx={{ background: "black", width: "100%", paddingY: "8px" }}>
                {/* Toolbar Container - Contains main header content */}
                <Toolbar
                    disableGutters="true"
                    sx={{
                        marginX: "auto",
                        paddingX: "10px",
                        height: "auto",
                        boxSizing: "border-box",
                        width: "100%",
                        maxWidth: "1200px",
                        display: "flex",
                        flexDirection:matches?"column":"row",
                        
                        transition: 'margin-left 0.9s ease-in-out, margin-right 0.9s ease-in-out'
                    }}
                >
                    {/* Logo and Menu Container */}
                    <div style={{width:matches?"100%":"auto", display: "flex", alignItems: "center",justifyContent:"flex-start"}}>
                        <IconButton
                            size="small"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                        >
                            <MenuIcon sx={{ fontSize: 40 }} />
                        </IconButton>
                        <Typography variant={matches ? "h5" : "h4"} component="span" sx={{cursor:"pointer"}} onClick={()=>navigate("/")}>
                            SalesBuddy
                        </Typography>
                    </div>

                    {/* Search and Navigation Container */}
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        flexGrow: 1,
                        justifyContent: "center"
                    }}>

                        <div style={{ background: "#353535", border: "1px solid white", borderRadius: "10px", display: "flex" }}>
                            <Button variant="outlined" sx={{ borderTopLeftRadius: "10px", borderBottomLeftRadius: "10px", color: "white", border: "none", width: 100 }} onClick={() => navigate("/cart")}>Cart</Button>
                            <div style={{ height: 40, borderRight: !isShipping ? "1px solid white" : "none" }}></div>
                            <Button varient="outlined" sx={{ color: "white", border: isShipping ? "3px solid #12da9d" : "none", width: 100 }} onClick={() => navigate("/checkout")}>Shipping</Button>
                            <Button varient="outlined" sx={{ borderTopRightRadius: "10px", borderBottomRightRadius: "10px", color: "white", border: !isShipping ? "3px solid #12da9d" : "none", width: 100, cursor: "no-drop" }}>Payment</Button>
                        </div>
                    </div>
                </Toolbar>


            </AppBar>
        </Box>
    );
}
