// Wishlist.js
import React from 'react';
import {
    Grid2,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    Box,
    Rating
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useEffect } from 'react';
import { postData, serverURL } from '../../backendservices/FetchNodeServices';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const Wishlist = () => {
    const sm = useMediaQuery('(max-width:600px)');
    const [wishlist, setWishList] = useState([])
    const navigate=useNavigate()
    const user = useSelector((state) => state.user);
    
    const fetchWistlist = async () => {
        const response = await postData("userinterface/userinterface_fetch_wishlist", { userid: user?.userid })
        if (response?.status) {
            setWishList(response?.data)
        } else {
            setWishList([])
        }
    }

    const handleAddToCart = (productId) => {
        
        // Call addToCart API or update state
    };

    const handleRemove = async (productdetailid, mobileno) => {
        const body = {
            "userid": user?.userid,
            "productdetailid": productdetailid
        }
        const response = await postData("userinterface/userinterface_delete_wishlist", body)
        if (response?.status) {
            fetchWistlist()
            alert(response.message)
        } else {
            alert(response.message)
        }
        // const updated = wishlist.filter(p => p.id !== productId);
        // Optionally call removeFromWishlist API
    };
    useEffect(() => {
        fetchWistlist()
         window.scrollTo(0, 0)
    }, [])
    if (wishlist.length === 0) {
        return (
            <div style={{height:"80vh",display:"flex",justifyContent:"center",alignItems:"center",color:"white",flexDirection:"column"}}>
                <Typography variant="h6" sx={{ textAlign: 'center', mt: 5 }}>
                    Your wishlist is empty.
                </Typography>
                <Button variant='contained'
                sx={{background:"#12daa8",fontWeight:"bold",fontSize:18,marginTop:3}}
                onClick={()=>navigate("/")}
                >Continue Shopping</Button>
            </div>
        );
    }

    return (
        <div style={{ width: "100%",minHeight:"90vh",maxWidth: 1200, marginLeft: 'auto', marginRight: "auto", boxSizing: "border-box", color: "white" }}>
            <Box sx={{ p: 3, width: "100%", boxSizing: "border-box" }}>
                <Typography variant="h4" gutterBottom>
                    My Wishlist
                </Typography>

                <Grid2 container spacing={3} sx={{ width: "100%" }}>
                    {wishlist.map((product) => (
                        <Grid2 item key={product.productdetailid} size={12} sx={{ border: "1px solid #616060ff" }}>
                            <Card sx={{ background: "#191919", color: "white", display: 'flex', flexDirection: sm ? "column" : "row", padding: sm ? 2 : 5 }}>
                                <div style={{ display: 'flex', flexGrow: 1 }}>
                                    <CardMedia
                                        sx={{ maxWidth: "100px", width: "100%", objectFit: "contain" }}
                                        component="img"
                                        image={`${serverURL}/images/${product.picture}`}
                                        alt={product.productname}
                                    />
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <div style={{ width: "100%" }}>
                                            {product.productname} ({product.productram} RAM, {product.productstorage}, {product.productcolorname})
                                        </div>
                                        <Typography variant="body2" >
                                            ₹{product.offerprice}
                                        </Typography>
                                        <Typography variant="body2" >
                                            <Rating readOnly value={product.ratings} sx={{ fontSize: 16 }} />
                                        </Typography>
                                        <Typography variant="body2" >
                                            Added on {new Date(product.date).toLocaleDateString('en-GB')}
                                        </Typography>
                                    </CardContent>
                                </div>
                                <Box sx={{ display: 'flex', flexDirection: sm ? "row" : "column", justifyContent: 'space-between', p: 2 }}>
                                    <Button
                                        variant="contained"
                                        sx={{ background: "#12daa8" }}
                                        onClick={() => handleAddToCart(product)}
                                    >
                                        Add to Cart
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={() => handleRemove(product.productdetailid, user?.mobileno)}
                                    >
                                        Remove
                                    </Button>
                                </Box>
                            </Card>
                        </Grid2>
                    ))}
                </Grid2>
            </Box>
        </div>
    );
};

export default Wishlist;
