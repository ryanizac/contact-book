import React, { useState } from 'react'
import "./Find.css"

export default function BoxFind({ children, ...props }) {
    const [value, setValue] = useState("")

    return (
        <input className="find" value={value} {...props}
            onChange={(e) => setValue(e.target.value)} />
    )
}