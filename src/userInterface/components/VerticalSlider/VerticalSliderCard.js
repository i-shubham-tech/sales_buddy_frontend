import React, { useState } from 'react'
import { serverURL } from '../../../backendservices/FetchNodeServices';

export default function VerticalSliderCard({ selectedImage, data, setSelectedImage }) {

  const [hover, setHover] = useState(false)
  return (
    <div style={{
      height: 85,
      width: 85,
      border: selectedImage == data ? "3px solid #00e9ba" : hover ? "3px solid #00e9ba" : "1px solid gray",
      paddingRight: 3,
      marginTop: 3,
      marginBottom: 3,
      cursor: 'pointer',
      transition: 'all .4s ease',
      boxSizing: "border-box"
    }}
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => { setSelectedImage(data) }}
    >
      {(data?.includes("webm") || data?.includes("mp4")) ? (
        <img
          src="/videoIcon.png"
          width="100%"
          style={{ objectFit: "contain" }}
        />
      ) : (
        <img
          src={`${serverURL}/images/${data}`}
          width="100%"
          style={{ objectFit: "contain" }}
        />
      )}
    </div>
  )
}
