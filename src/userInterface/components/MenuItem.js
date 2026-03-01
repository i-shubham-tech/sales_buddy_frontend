import { ListItem, useMediaQuery } from '@mui/material'
import React, { useEffect } from 'react'
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

export default function MenuItem({ show, setShowMenu, onMouseEnter, onMouseLeave }) {
    const dispatch=useDispatch()
    const navigate = useNavigate();
     const user = useSelector((state) => state.user)
    const sm = useMediaQuery('(max-width:780px)');
    const handleClick = (page) => {
        setShowMenu(prev => !prev)
        navigate(page)


    }
    function handleLogout(){

        dispatch({type:"DEL_USER",payload:user?.userid})
        navigate('/')
    }
    console.log(show)
    useEffect(() => {

    }, [show])
    return (
        <div
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            style={{
                position: "fixed",  // Changed from absolute to fixed
                right:sm?0: 70,
                display: show ? "block" : "none",
                top: 50,
                zIndex: 9999,  // Reduced z-index to stay below header
                background: "#191919",
                width: "100%",
                maxWidth: 300,
                height:"auto",  // Changed height to maxHeight
                overflowY: "auto"  // Added scroll for overflow content
            }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, padding: "20px 0" }}>
                <ListItem sx={{ padding: 2, color: "white", fontSize: 16, cursor: "pointer", '&:hover': { color: "#12DAA8", background: '#202020' } }} onClick={() => handleClick("/myprofile")}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <AccountCircleOutlinedIcon />
                        <div>
                            <div>My Profile</div>
                            <div style={{ fontSize: 12, color: "#808080" }}>Edit your basic detail</div>
                        </div>
                    </div>
                </ListItem>
                <ListItem sx={{ padding: 2, color: "white", fontSize: 16, cursor: "pointer", '&:hover': { color: "#12DAA8", background: '#202020' } }} onClick={() => handleClick("/orders")}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <Inventory2Icon />
                        <div>
                            <div>My Orders</div>
                            <div style={{ fontSize: 12, color: "#808080" }}>Track your orders</div>
                        </div>
                    </div>
                </ListItem>
                <ListItem sx={{ padding: 2, color: "white", fontSize: 16, cursor: "pointer", '&:hover': { color: "#12DAA8", background: '#202020' } }} onClick={() => handleClick("/wishlist")}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <FavoriteBorderOutlinedIcon />
                        <div>
                            <div>My Wishlist</div>
                            <div style={{ fontSize: 12, color: "#808080" }}>Your saved items</div>
                        </div>
                    </div>
                </ListItem>
                <ListItem sx={{ padding: 2, color: "white", fontSize: 16, cursor: "pointer", '&:hover': { color: "#12DAA8", background: '#202020' } }} onClick={handleLogout}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <LoginOutlinedIcon />
                        <div>
                            <div>Logout</div>
                            <div style={{ fontSize: 12, color: "#808080" }}>Sign out from account</div>
                        </div>
                    </div>
                </ListItem>
            </div>
        </div>
    )
}
