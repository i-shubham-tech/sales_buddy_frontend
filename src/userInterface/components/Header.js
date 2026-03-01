// Import necessary dependencies from Material-UI and React
import * as React from 'react';
import { AppBar, Box, Toolbar, Typography, IconButton, Badge } from '@mui/material';
import { Menu as MenuIcon, ShoppingCart as ShoppingCartIcon, Edit as EditIcon, Person as PersonIcon, Room as LocationIcon } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Searchbar from './Searchbar';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Login from './UserInteraction/Login';
import OTPInput from './UserInteraction/OTPInput';
import MenuItem from './MenuItem';


export default function Header() {
    // Get cart items from Redux store
    const [refesh1, setRefresh1] = React.useState(false)
    const location = useLocation()
    const disable = location.pathname.includes("checkout") || location.pathname.includes("payment") || location.pathname.toLowerCase().includes("dashboard")
    const cart = useSelector((state) => state.cart);
    const user = useSelector((state) => state.user);
    const refresh = useSelector((state) => state.refresh);
    const isUserExist = Boolean(user?.userid)


    const cartLength = Object.keys(cart).length;
    // Media query for responsive design
    const matches = useMediaQuery('(max-width:780px)');
    const sm = useMediaQuery('(max-width:500px)');
    const [openLoginDialog, setOpenLoginDialog] = React.useState(false)
    const [openOtpDialog, setOpenOtpDialog] = React.useState(false)
    const [loginBody, setLoginBody] = React.useState({})
    const [otpValue, setOtpValue] = React.useState("")
    const [showMenu, setShowMenu] = React.useState(false);

    React.useEffect(() => {
        setRefresh1(!refesh1)
    }, [refresh])




    const navigate = useNavigate()
    // alert(loginValue)

    return (
        <Box sx={{ position: "fixed", display: disable ? "none" : "block", zIndex: 2 }}>
            <Login openLoginDialog={openLoginDialog} setOpenLoginDialog={setOpenLoginDialog} setOpenOtpDialog={setOpenOtpDialog} loginBody={loginBody} setLoginBody={setLoginBody} otpValue={otpValue} setOtpValue={setOtpValue} />
            <OTPInput status={"home"} openOtpDialog={openOtpDialog} setOpenOtpDialog={setOpenOtpDialog} loginBody={loginBody} generatedOTP={otpValue} setOtpValue={setOtpValue} />
            <MenuItem show={showMenu} setShowMenu={setShowMenu} onMouseEnter={() => setShowMenu(true)} onMouseLeave={() => setShowMenu(false)} />
            <AppBar position='fixed' sx={{ background: "black", width: "100%", paddingY: "8px" }}>
                {/* Toolbar Container - Contains main header content */}
                <Toolbar disableGutters="true"
                    sx={{
                        marginX: "auto",
                        paddingX: "10px",
                        height: "64px",
                        boxSizing: "border-box",
                        width: "100%",
                        maxWidth: "1200px",
                        display: "flex",
                        alignItems: "center",
                        transition: 'margin-left 0.9s ease-in-out, margin-right 0.9s ease-in-out'
                    }}
                >
                    {/* Logo and Menu Container */}
                    <div style={{ display: "flex", alignItems: "center" }}>

                        <Typography variant={matches ? "h5" : "h4"} component="span" sx={{ cursor: "pointer" }} onClick={() => navigate("/")}>
                            SalesBuddy
                        </Typography>
                    </div>

                    {/* Search and Navigation Container */}
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        flexGrow: 1,
                        justifyContent: matches ? "flex-end" : "space-between",
                        marginLeft: "20px"
                    }}>
                        {/* Desktop Search Bar Container */}
                        <div style={{
                            flexGrow: "1",
                            height: "45px",
                            display: matches ? "none" : "flex",
                            justifyContent: "center"
                        }}>
                            <Searchbar />
                        </div>

                        {/* User Actions Container (Location, Profile, Cart) */}
                        <div style={{ display: "flex", alignItems: "center", gap: 20, marginLeft: "10px", paddingRight: sm ? 13 : 0 }}>
                            {/* Location Display Container */}
                            <div style={{ display: matches ? "none" : "flex", alignItems: "center", gap: 2 }}>
                                <LocationIcon sx={{ fontSize: 26 }} />
                                <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                                    <p style={{ fontSize: 14, fontWeight: 600 }}>Gwalior,475001</p>
                                    <EditIcon sx={{ fontSize: 14 }} />
                                </div>
                            </div>
                            {/* Profile and Cart Icons */}
                            {
                                isUserExist ?
                                    <AccountCircleIcon sx={{ fontSize: 28 }} onClick={() => setShowMenu(prev => !prev)} onMouseLeave={() => setShowMenu("none")} onMouseOver={() => setShowMenu("block")} />
                                    :
                                    <PersonIcon sx={{ fontSize: 28, cursor: "pointer" }} onClick={() => setOpenLoginDialog(true)} />
                            }

                            <Badge
                                badgeContent={cartLength}
                                sx={{ "& .MuiBadge-badge": { backgroundColor: "#12DAA8", color: "black" } }}
                            >
                                <ShoppingCartIcon sx={{ fontSize: 28, cursor: "pointer", color: "white" }} onClick={() => navigate("/cart")} />
                            </Badge>
                        </div>
                    </div>
                </Toolbar>

                {/* Mobile Search Bar Container */}
                <div style={{
                    display: matches ? "flex" : "none",
                    flexGrow: "1",
                    height: "45px",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingLeft: "10px",
                    paddingRight: "10px",
                }}>
                    <Searchbar />
                </div>
            </AppBar>
        </Box>
    );
}


