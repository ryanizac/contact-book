import React from 'react'
import './Divisor.css'

export default function Divisor({ bg }) {
    return (
        <div className="divisor" style={bg ? { background: "var(--gray)" } : {}}></div>
    )
}