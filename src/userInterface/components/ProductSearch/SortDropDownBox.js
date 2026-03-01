import React, { useEffect, useState } from 'react'
import { Box, Checkbox, ListItemButton } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export default function SortDropDownBox({ title, data,openBox,onOpen }) {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedValue, setSelectedValue] = useState("")

    const toggleDropdown = () => {
        setIsOpen((prev) => !isOpen)
        onOpen(null)
    };
    const handleChange = (item) => {
        setSelectedValue(item)
        setIsOpen((prev) => !isOpen)
    }
useEffect(()=>{
    if(openBox) setIsOpen(false)
},[])
    return (
        <div >
            <Box
                sx={{
                    display: "flex",
                    width: "auto",
                    // margin: '2rem auto',
                    padding: "6px 10px",
                    borderRadius: '4px',
                    background: "#393939",
                    fontFamily: 'Arial',
                    overflow: 'hidden',
                    color: "white",
                    alignItems: "center",
                    gap: 1,
                    boxSizing: "border-box",
                    fontSize: 14,
                    cursor: "pointer"
                }}
                onClick={toggleDropdown}
            >
                <span>{title}</span>
                <span style={{ fontWeight: 600 }}>{selectedValue}</span>
                <KeyboardArrowDownIcon sx={{ color: "white" }} />
            </Box>
            {
                isOpen && (
                    <Box
                        sx={{
                            position: "absolute",
                            padding: '12px',
                            borderRadius: '4px',
                            background: "#393939",
                            textAlign: 'center',
                            color: "white",
                            marginTop: "4px",
                            minWidth: 140,
                            zIndex: 1,
                            display: "flex",
                            flexDirection: "column",
                            gap: .5
                        }}
                    >
                        {
                            data?.map((item, i) => (
                                <div key={i} style={{ display: "flex", gap: 10, alignItems: "center", cursor: "pointer", color: selectedValue == item ? "#12DA9D" : "white" }} onClick={() => handleChange(item)}>
                                    <ListItemButton 
                                        sx={{
                                            width: '100%',
                                           margin:0,
                                            '&:hover': {
                                                backgroundColor: '#484848'
                                            }
                                        }}
                                    >
                                        {item}
                                    </ListItemButton>
                                </div>
                            ))
                        }

                    </Box>
                )
            }
        </div>
    )
}

