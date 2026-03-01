import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from 'react-router-dom';

export default function Searchbar() {
  const matches = useMediaQuery('(max-width:780px)');
  const [text, setText] = useState("")
  const navigate=useNavigate()

  const handleSearch = (e) => {
    if (e.key == "Enter") {
      navigate(`/productsearch/${text}`)
      setText("")
     
    }
    
    

  }

  return (
    <div style={{
      background: "#fff",
      width: "100%",
      ...(matches ? {} : { maxWidth: '450px' }),
      height: "100%",
      paddingLeft: 8,
      paddingRight: 8,
      borderRadius: 6,
      display: "flex",
      alignItems: "center",
      gap: 2
    }}
    >
      <input
        style={{
          flexGrow: 1,
          outline: "none",
          border: "0",
          fontSize: 16,
          paddingLeft: 20
        }}
        value={text}
        onKeyDown={handleSearch}
        onChange={(e) => setText(e.target.value)}
        placeholder='What are you looking for?'
      />
      <SearchIcon sx={{ color: "black" }} />
    </div>
  );
}
