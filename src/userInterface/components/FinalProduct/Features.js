import React from 'react'

export default function Features({ data }) {
    return (
        <div style={{ border: "2px solid gray", padding: "0 10px", borderRadius: 6 }}>
            <div dangerouslySetInnerHTML={{ __html: data?.description }} />
        </div>

    )
}
