import React, { useEffect, useState } from 'react'
import VerticalSlider from '../VerticalSlider/VerticalSlider'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import { Divider, Slider } from '@mui/material';
import { serverURL } from '../../../backendservices/FetchNodeServices';
import SingleItemSlider from './SingleItemSlider';
import useMediaQuery from '@mui/material/useMediaQuery'

function ProductPicture({ data }) {
  const matches = useMediaQuery('(max-width:1000px)')
  const [verticalImage, setVerticalImage] = useState([])
  const [selectedImage, setSelectedImage] = useState([])


  useEffect(() => {
    setVerticalImage(data?.picture?.split(","))
    setSelectedImage(data?.picture?.split(",")[0])

  }, [data])

  return (
    <div>
      {!matches ?
        <div style={{ width: "100%", display: "flex", position: "relative", height: "auto" }} >
          <VerticalSlider selectedImage={selectedImage} data={verticalImage} setSelectedImage={setSelectedImage} />
          
          <div style={{ flexGrow: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
            {(selectedImage?.includes("webm") || selectedImage?.includes("mp4")) ? (
              <video
                src={`${serverURL}/images/${selectedImage}`}
                width="100%"
                controls
                autoPlay
                muted
                loop
                style={{ objectFit: "contain" }}
              />
            ) : (
              <img
                src={`${serverURL}/images/${selectedImage}`}

                style={{ objectFit: "contain", width: '100%', maxWidth: "400px" }}
              />
            )}
          </div>
          <FavoriteBorderIcon sx={{ position: "absolute", top: 10, right: 40 }} />
          <ShareIcon sx={{ position: "absolute", top: 10, right: 0 }} />
          <div style={{ padding: "60px 0px", marginRight: 2 }}>
            <Divider orientation="vertical" sx={{ background: "white" }} />
          </div>



        </div>
        :
        <SingleItemSlider data={verticalImage} />

      }



      <div>


      </div>

    </div>
  )
}

export default ProductPicture