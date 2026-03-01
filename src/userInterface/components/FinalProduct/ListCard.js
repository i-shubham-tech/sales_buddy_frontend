import React, { useState } from 'react'
import { postData } from '../../../backendservices/FetchNodeServices';
import { useNavigate } from 'react-router-dom';

export default function ListCard({ title,productid, item, defaultValue, setDefaultValue }) {
    const [hover, setHover] = useState(false);
    const navigate=useNavigate()

    let data = "";
    if (title == "Colors") {
        data = item?.productcolorname;
    }
    else if (title == "Ram") {
        data = item?.productram
    }
    else if (title == 'Storage') {
        data = item?.productstorage
    }
    const isSelected = data === defaultValue;
    const handleClick=async(data,productid)=>{
        setDefaultValue(data)
        const response=await postData("userInterface/userinterface_fetch_productdetailid_by_product&color",{productid,data})
        if(response?.data?.productdetailid) {
            navigate(`/product/${response?.data?.productdetailid}/${productid}`)
        } else {
            console.error("No productdetailid received in response:", response)
        }
       
    }
    return (

        <div
            style={{
                border: "1px solid gray",
                padding: "8px 10px",
                borderRadius: 6,
                fontSize: 12,
                fontWeight:hover?900:100,
                cursor: 'pointer',
                border: data == defaultValue ? "1px solid #26CDBA" : "1px solid white",
                background: data == defaultValue ? "black" : hover?"#49A5A2":"transparent"


            }}
            onMouseEnter={() => !isSelected && setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={()=>handleClick(data,productid)}

        >
            {data}
        </div>
    )
}
