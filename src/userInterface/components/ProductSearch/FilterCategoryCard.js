import React, { useState } from 'react'
import { Divider, Checkbox } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { KeyboardArrowUp } from '@mui/icons-material';

export default function FilterCategoryCard({ title, data }) {
    const [isOpen, setOpen] = useState(false)
    const handleToggle = () => {
        setOpen(prev => !prev)
    }
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <Divider sx={{ background: "gray" }} />
            <div style={{ position: 'relative' }}>
                {/* Dropdown Trigger */}
                <div
                    onClick={handleToggle}
                    style={{
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        cursor: 'pointer',
                        fontFamily: 'Arial',
                        fontSize: 18,
                        justifyContent: "space-between",
                    }} >
                    <span>{title}</span>
                    {isOpen ? <KeyboardArrowUp sx={{ fontSize: 25 }} /> : <KeyboardArrowDownIcon sx={{ fontSize: 25 }} />}
                </div>

                {/* Dropdown Content */}
                <div style={{
                    borderRadius: '4px',
                    padding: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                    zIndex: 10,
                    minWidth: '100px',
                    maxHeight: isOpen ? '500px' : '0',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease-in-out',
                    opacity: isOpen ? 1 : 0,

                }}>
                    {
                        data?.map((item) => (
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <Checkbox sx={{
                                    padding: 0,
                                    color: '#979797',
                                    '&.Mui-checked': { color: '#12daa8' },
                                }} />
                                <span style={{ fontSize: 16, color: "black" }}>{item}</span>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
