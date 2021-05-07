import React from 'react'
import './Contact.css'

export default function Contact({name, ...props}) {
    return(
        <div className="contact" {...props}>
            {name}
        </div>
    )
}