import React, { useState } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  CardActions,
  useMediaQuery,
  Rating,
} from '@mui/material';
import { Favorite, FavoriteBorder, StarRate } from '@mui/icons-material';
import { serverURL } from '../../../backendservices/FetchNodeServices';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({product}) => {
  
  const navigate=useNavigate()
    const sm=useMediaQuery('(max-width:750px)')
    // const product=  {
    //         "productname": "Apple iPhone 16 Pro Max",
    //         "productcolorname": "Black Titanium",
    //         "productram": "8GB",
    //         "productstorage": "256GB",
    //         "price": 139999,
    //         rating:5,
    //         "offerprice": 127999,
    //         "picture": "862a5e04-88f7-48f0-952b-55a4462856af.webp"
    //     }
//   const [wishlisted, setWishlisted] = useState(product?.isWishlisted || false);

  const handleWishlistClick = () => {
    // const updatedStatus = !wishlisted;
    // setWishlisted(updatedStatus);
    // onWishlistToggle?.(product.id, updatedStatus);
  };

  return (
    <Card sx={{width:"100%",boxShadow:0,display:"flex",flexDirection:sm?"row":"column",color:"white",background:"transparent",boxSizing:"border-box",padding:1,borderBottom:"1px solid white",cursor:"pointer"}} onClick={()=>navigate(`/product/${product.productdetailid}/${product.productid}`)}>
      <CardMedia
        component="img"
        height={"250"}
        image={`${serverURL}/images/${product.picture}`}
        alt={product.name}
        sx={{ objectFit: 'contain', width:sm?'150px':"100%",borderRadius:3,padding:3, background:"#393939",boxSizing:"border-box"}}
      />
      <CardContent sx={{flexGrow:1, display:"flex", flexDirection:"column",gap:sm?2:3}}>
        <Typography fontWeight={800} fontSize={sm?12:17}>
          {product.productname}   {product.productram} RAM  ({product.productstorage} {product.productcolorname})
        </Typography>
        <Typography variant="subtitle1" sx={{display:'flex',alignItems:"center",gap:1,color:"#12daa8"}}>
         {product.rating} <StarRate sx={{fontSize:20,marginTop:"-1px"}}/>
        </Typography>
        <Typography variant="subtitle1" fontWeight={600}>
          ₹{product.offerprice} <span style={{textDecoration:"line-through",opacity:.5,marginLeft:6}}> ₹{product.price} </span>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
