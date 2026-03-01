import React from 'react'
import { Box } from '@mui/material'
import { useState } from 'react'
import FilterListIcon from '@mui/icons-material/FilterList';
import FilterBox from './FilterBox';
export default function AllFilter({onOpen}) {
    const [isOpen, setIsOpen] = useState(false)
    const toggleDropdown = () => {
        setIsOpen((prev) => !isOpen)
        onOpen(null)

    };

    return (
        <div>
            <Box sx={{
                display: "flex",
                width: "auto",
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
                <span>All Filter</span>
                <FilterListIcon sx={{ color: "white" }} />
            </Box>
            {
                isOpen && <div style={{ position: "absolute", width: "100%", maxWidth: 500, top: -19, zIndex: 9999, height: "100%", marginLeft: "56px" }}>
                    <FilterBox  onClose={setIsOpen} />
                </div>
            }
        </div>
    )
}
