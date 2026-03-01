import { Grid2 } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import useMediaQuery from '@mui/material/useMediaQuery'
import ShippingInfoTitle from '../components/Checkout/ShippingInfoTitle';
import PersonalInformation from '../components/Checkout/PersonalInformation';
import DeliveryOptions from '../components/Checkout/DeliveryOptions';
import { useDispatch, useSelector } from 'react-redux';
import GSTInformation from '../components/Checkout/GSTInformation ';
import SubmittedAddress from '../components/Checkout/SubmittedAddress';
import ContactInfo from '../components/Checkout/ContactInfo';
import Header from '../components/Checkout/Header';
import OrderSummary from '../components/Checkout/OrderSummary';
import Address from '../components/Checkout/Address';
import Swal from 'sweetalert2'
import { useNavigate, useParams } from 'react-router-dom'
import { useRazorpay } from "react-razorpay";
import { postData } from '../../backendservices/FetchNodeServices';

export default function Checkout() {
    const navigate = useNavigate()
    const { error, isLoading, Razorpay } = useRazorpay();
    const { productdetailid } = useParams()

    const lg = useMediaQuery('(max-width:1024px)');
    const sm = useMediaQuery('(max-width:500px)');
    const product = useSelector(state => state.cart)
    const [productData, setProductData] = useState(Object.values(product))
    const personalInfoRef = useRef();
    const addressRef = useRef();
    const [address, setAddress] = useState([])
    const [netAmount, setNetAmount] = useState(0)
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch()
    const fetchAddress = async () => {
        const response = await postData("userinterface/userinterface_fetch_user_address", { mobileno: user?.mobileno })
        if (response?.status) {
            setAddress(response?.data)
        }
        else {
            setAddress([])
        }

    }

    const fetchProductdetails = async () => {
        const response = await postData("userinterface/userinterface_fetch_productdetail_by_id", { productdetailid })
        if (response?.status) {
            const pd = response?.data
            pd["quantity"] = 1
            setProductData([pd])
        }
        else {
            setProductData([])
        }

    }

    const handlePayment = async () => {
        try {

            if (address?.length == 0) {
                const personalInfoResult = await personalInfoRef.current?.handleSubmit();
                const addressResult = await addressRef.current?.handleSubmit();
                if (!personalInfoResult || !addressResult) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Please fill all required fields',
                        toast: true,
                        position: 'top'
                    });
                    return;
                }
            }

            // Create order on backend
            const orderResponse = await postData('userinterface/create-order', {
                userid: user.userid,
                totalamount: netAmount,
                cart: productData,
                paymentmode: "Razorpay",
                address: address[0]?.address,
            });

            if (orderResponse.status) {
                openRazorPayment(orderResponse.orderno);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to create order',
                    toast: true,
                    position: 'top'
                });
            }
        } catch (error) {
            console.error("Payment error:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Something went wrong',
                toast: true,
                position: 'top'
            });
        }
    }
    const openRazorPayment = (orderno) => {
        const options = {
            key: "rzp_test_GQ6XaPC6gMPNwH",
            amount: netAmount * 100,
            currency: "INR",
            name: "Salesbuddy",
            description: "Order Payment",
            handler: async (response) => {
                try {
                    const verifyResponse = await postData('userinterface/verify-payment', {
                        orderno,
                        transactionid: response.razorpay_payment_id
                    });
                    console.log(verifyResponse)

                    if (verifyResponse.status) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Payment Successful',
                            text: 'Your order has been placed successfully!',
                            toast: true,
                            position: 'top'
                        });
                        if (!productdetailid) {
                            dispatch({ type: "EMPTY_CART" })
                        }
                        navigate("/orders")

                    } else {
                        throw new Error('Payment status update failed');
                    }
                } catch (error) {
                    console.error("Payment status update error:", error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Payment Failed',
                        text: 'Payment status update failed. Please try again.',
                        toast: true,
                        position: 'top'
                    });
                }
            },
            prefill: {
                name: user?.username,
                email: user?.emailid,
                contact: user?.mobileno,
            },
            theme: {
                color: "#191919",
            },
            modal: {
                ondismiss: () => {
                    navigate("/checkout");
                }
            }
        };

        const razorpayInstance = new Razorpay(options);
        razorpayInstance.open();
    };

    useEffect(() => {
        fetchAddress()
        window.scrollTo(0, 0)
    }, [])
    useEffect(() => {
        if (productdetailid) {
            fetchProductdetails()
        }

    }, [productdetailid])


    return (
        <div>
            <Header />
            <div style={{ backgroundColor: "#F9F9F9", minHeight: "100vh", padding: 20 }}>
                <div style={{ marginLeft: "auto", marginRight: "auto", maxWidth: 1170, paddingBottom: 20, display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", flexGrow: 1, }}>
                        <Grid2 container spacing={2} sx={{ width: "100%" }}>

                            <Grid2 sx={{ display: 'flex', flexDirection: "column", gap: 2 }} size={lg ? 12 : 8.5}>
                                {address?.length == 0 ?
                                    <>
                                        <ShippingInfoTitle />
                                        <PersonalInformation ref={personalInfoRef} />
                                        <Address ref={addressRef} />
                                    </>
                                    :
                                    <>
                                        <div style={{ display: "flex", gap: 4 }}>
                                            <SubmittedAddress addressList={address} fetchAddress={fetchAddress} />
                                        </div>
                                        <ContactInfo />
                                    </>


                                }
                                <DeliveryOptions productData={productData} />
                                <GSTInformation />
                            </Grid2>

                            <Grid2 size={lg ? 12 : 3.5} sx={{}}>
                                <OrderSummary onPaymentClick={handlePayment} productData={productData} setNetAmount={setNetAmount} />
                            </Grid2>

                        </Grid2>
                    </div>
                </div>
            </div>
        </div>
    )
}
