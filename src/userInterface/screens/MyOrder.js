import React from "react";
import {
    Card,
    CardContent,
    Typography,
    CardMedia,
    Grid2,
    Chip,
    Box,
    Divider,
    useMediaQuery,
    Button,
} from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { postData, serverURL } from "../../backendservices/FetchNodeServices";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";



const getStatusColor = (status) => {
    switch (status) {
        case "Delivered":
            return "success";
        case "Out for Delivery":
            return "warning";
        case "Cancelled":
            return "error";
        case "pending":
            return "info";
        default:
            return "default";
    }
};

const MyOrders = () => {
    const navigate = useNavigate()
    const [orders, setOrders] = useState([])
    const sm = useMediaQuery('(max-width:600px)');
    const md = useMediaQuery('(max-width:900px)');


    const user = useSelector((state) => state.user)

    const fetchOrders = async () => {
        const response = await postData("userinterface/get-my-orders", { userid: user?.userid })
        if (response?.status) {
            setOrders(response?.data)
        } else {
            setOrders([])
        }
    }

    useEffect(() => {
        fetchOrders()
        window.scrollTo(0, 0)
    }, [])

    if (orders.length === 0) {
        return (
            <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", color: "white", flexDirection: "column" }}>
                <Typography variant="h6" sx={{ textAlign: 'center', mt: 5 }}>
                    Your Order is empty.
                </Typography>
                <Button variant='contained'
                    sx={{ background: "#12daa8", fontWeight: "bold", fontSize: 18, marginTop: 3 }}
                    onClick={() => navigate("/")}
                >Continue Shopping</Button>
            </div>
        );
    }

    return (
        <div style={{background:"#f9f9f9f4"}}>
            <div style={{ width: "100%", maxWidth: 1200, marginLeft: 'auto', marginRight: "auto", boxSizing: "border-box", color: "white" }}>
                <Box p={3} sx={{ color: "white" }}>
                    <Typography variant="h5" gutterBottom sx={{color:"black",fontWeight:"bold",paddingY:2}}>
                        My Orders
                    </Typography>
                    <Grid2 container spacing={4}>
                        {orders.map((order) => (
                            <Grid2 item size={md?12:6} key={order.id}>
                                <Card sx={{ display: "flex", borderRadius: 2 }}>
                                    <CardMedia
                                        component="img"
                                        image={`${serverURL}/images/${order.productImage}`}
                                        alt={order.productName}
                                        sx={{ width: sm ? 130 : 150, objectFit: "contain" }}
                                    />
                                    <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
                                        <CardContent sx={{display:"flex",flexDirection:"column",gap:1}}>
                                            <Typography variant="h6">{order.productName}</Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Ordered on: {new Date(order.orderDate).toLocaleDateString("en-GB")}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Quantity: {order.quantity}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Amount:₹{order.price}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Delivery Address: {order.address}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Payment Status: {order.paymentstatus == "paid" ? "paid" : order.paymentmode == "cash on delivery" ? "cash on delivery" : "pending"}
                                            </Typography>
                                            <Typography variant="body2" mt={1} display={"flex"} alignItems={"center"} gap={1}>
                                                <div> Delivered Status:</div>
                                                <Chip
                                                    label={order.status}
                                                    color={getStatusColor(order.status)}
                                                    size="small"

                                                />

                                            </Typography>

                                        </CardContent>
                                    </Box>
                                </Card>
                            </Grid2>
                        ))}
                    </Grid2>
                </Box>
            </div>
        </div>
    );
};

export default MyOrders;
