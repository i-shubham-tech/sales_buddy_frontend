import React, { useEffect, useState } from 'react'
import DateTextField from './DatePicker';
import { postAuthData } from '../../backendservices/FetchNodeServices';

export default function DateFilter({setOrders}) {
    const [from, setFrom] = useState(null);
    const [to, setTo] = useState(null);
   
// alert(from)
    // alert(`from: ${new Date(from).toISOString().split("T")[0]} to:${new Date(to).toISOString().split("T")[0]}`)
  //  // alert(!(new Date(from).toISOString().split("T")[0] <= new Date(to).toISOString().split("T")[0]))
    function handleValidaton() {
        let error = false
        let message = ""
        if (!from) {
            error = true
        }
        else if (!to) {
            error = true
        }
        else if (!(from <= to)) {
            error = true
            message = 'from cannot be less than to'
        }
        return [error, message]
    }
    function handleChange(type,val){
        const date=new Date(val)
        date.setDate(date.getDate()+1)

        const formattedDate=date.toISOString().split("T")[0]

        if(type=="from"){
            setFrom(formattedDate)
        }
        else{
            setTo(formattedDate)
        }


    }
    async function handleSubmit() {
        const isError = handleValidaton()
        if (!isError[0]) {
            const response = await postAuthData('order/fetch-orders-by-date', { from:new Date(from).toISOString().split("T")[0], to:new Date(to).toISOString().split("T")[0] })
           if(response?.status){
                setOrders(response?.data)
            } 
            else{
                alert("unsuccess")
            }
        }
        else{
           if(isError[1]){
             alert(isError[1])
           }
        }

    }

    useEffect(()=>{
        handleSubmit()
    },[from,to])


    return (
        <div style={{ display: "flex", gap: 5 }}>
            <p>From</p>
            <DateTextField  setDate={(val) =>
                handleChange("from",val)
            } />

            <p>To</p>
            <DateTextField setDate={(val) =>
                 handleChange("to",val)
            } />
        </div>
    )
}


