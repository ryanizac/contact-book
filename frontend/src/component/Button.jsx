import React, { useState } from 'react'
import "./Button.css"

export default function Button({ children, ...props }) {
    const [disable, setdisable] = useState(false)
    const classList = "button" + (disable ? " buttonDisabled" : "")

    return (
        <div className={classList} {...props}
        // onClick={() => setdisable(!disable)}
        >
            {children}
        </div>
    )
}