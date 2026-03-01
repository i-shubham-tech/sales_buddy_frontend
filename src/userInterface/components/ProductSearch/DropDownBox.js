import React, { useEffect, useState } from 'react';
import { Box, Checkbox, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { CheckBox } from '@mui/icons-material';

export default function DropDownBox({ title, data, isOpen, onOpen }) {
    const toggleDropdown =  () => {
        if (isOpen) {
             onOpen(null); // Close this box
        } else {
             onOpen(title); // Open this box
        }
    };

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
                    color: isOpen ? "#12daa8" : "white",
                    alignItems: "center",
                    gap: 3,
                    boxSizing: "border-box",
                    fontSize: 14,
                    cursor: "pointer"
                }}
                onClick={toggleDropdown}
            >
                <span>{title}</span>
                <KeyboardArrowDownIcon sx={{ color: "white" }} />
            </Box>
            {
                isOpen && (
                    <Box sx={{
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
                                <div key={i} style={{ display: "flex", gap: 10, alignItems: "center", }}>
                                    <Checkbox sx={{ padding: 0, color: "#979797", '&.Mui-checked': { color: "#12daa8" } }} />
                                    <span style={{ fontSize: 16, fontWeight: 600 }}>{item}</span>
                                </div>
                            ))
                        }

                    </Box>
                )
            }
        </div>
    );


};


