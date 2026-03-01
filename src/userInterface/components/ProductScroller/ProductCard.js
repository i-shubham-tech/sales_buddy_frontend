import { Card, Typography } from '@mui/material';
import React from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import useMediaQuery from '@mui/material/useMediaQuery';
import { postData, serverURL } from '../../../backendservices/FetchNodeServices';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ProductCard({ data }) {
  const navigate = useNavigate();
  const sm = useMediaQuery('(max-width:850px)');
  const user = useSelector((state) => state.user);



  const addWishList = async () => {
    if (!Boolean(user?.userid)) {
      alert("Please login")
      return 
    }
    else {
      const body = {
        "userid": user?.userid,
        "productdetailid": data.productdetailid
      }
      const response = await postData("userinterface/userinterface_add_wishlist", body)
      if (response?.status) {
        alert(response.message)
      }
      else {
        alert(response.message)
      }

    }
  }
  return (
    <div style={{ position: "relative" }}>
      <FavoriteBorderIcon
        sx={{
          fontSize: sm ? 20 : 26,
          position: 'absolute',
          zIndex: 9999,
          top: 10,
          right: 18,
          cursor: 'pointer',
          ':hover': { color: '#12DAA8' }
        }}
        onClick={addWishList}
      />

      <div
        onClick={() => navigate(`/product/${data.productdetailid}/${data.productid}`)}
        style={{
          cursor: 'pointer',
          background: '#121212',
          padding: '20px 15px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: "center",
          position: 'relative',
          maxWidth: '310px',
          maxHeight: '365px',
          marginLeft: '7.5px',
          marginRight: '3px',
          boxSizing: 'border-box',
          borderRadius: 8
        }} >
        <div
          style={{
            height: sm ? '122px' : '220px',
            width: sm ? '122px' : '220px',
            padding: sm ? '15px 3px' : '25px',
            boxSizing: 'border-box',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <img
            src={`${serverURL}/images/${data.picture}`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain'
            }}
          />
        </div>

        <div
          style={{
            fontWeight: 700,
            width: '100%',
            maxWidth: sm ? '122px' : '230px',
            textOverflow: 'ellipsis'
          }}
        >
          <div
            style={{
              fontSize: sm ? 11 : 18,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            {data.productname} ({data.productram} RAM, {data.productstorage}, {data.productcolorname})
          </div>

          <div
            style={{
              marginTop: sm ? 12 : 9,
              fontSize: sm ? 14 : 18
            }}
          >
            <span>&#8377;{data.offerprice} </span>
            <span
              style={{
                color: 'gray',
                fontSize: sm ? 10 : 14
              }}
            >
              <s>&#8377; {data.price} </s>
            </span>
          </div>

          <div style={{ marginTop: sm ? 10 : 3 }}>
            <Rating
              name=""
              defaultValue={data.ratings}
              precision={0.1}
              readOnly
              sx={{
                color: '#12DAA8',
                '& .MuiRating-iconEmpty': {
                  // optional: color for empty stars
                }
              }}
              size="small"
              emptyIcon={
                <StarIcon
                  style={{
                    color: '#333',
                    fontSize: '19px'
                  }}
                />
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
