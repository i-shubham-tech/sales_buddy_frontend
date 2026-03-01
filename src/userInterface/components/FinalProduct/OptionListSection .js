import React, { useEffect, useState } from 'react'
import ListCard from './ListCard'

export default function OptionListSection({productid, title, data, DefaultValue }) {
    const [defaultValue, setDefaultValue] = useState(DefaultValue)
        
    useEffect(() => {
        setDefaultValue(DefaultValue)
    }, [DefaultValue])
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <span style={{ fontWeight: 600, fontSize: 14 }}>{title}</span>
            <div style={{ display: "flex", gap: 20 }}>
                {
                    data.map((item, i) => {
                        return (
                            <ListCard productid={productid}  title={title} item={item} defaultValue={defaultValue} setDefaultValue={setDefaultValue}/>

                        )
                    })

                }
            </div>
        </div>
    )
}
