import React from "react";
import { useRazorpay, RazorpayOrderOptions } from "react-razorpay";
import Header from "../components/Checkout/Header";

const PaymentComponent = () => {


  return (
    <div style={{ 
      padding: '40px', 
      maxWidth: '800px', 
      margin: '0 auto',
      minHeight: '60vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#F9F9F9',
      borderRadius: '10px',
      boxShadow: '0 0 20px rgba(0,0,0,0.05)'
    }}>
      <Header/>
      <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '30px' }}>Payment Processing</h1>
      <div style={{ textAlign: 'center', color: '#666' }}>
        Please wait while we redirect you to the order...
      </div>
    </div>
  );
};

export default PaymentComponent;