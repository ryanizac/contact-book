import React, { useContext } from 'react'
import "./Detail.css"

import avatar from '../assets/img/contact.png'
import Divisor from './Divisor'

import { Context } from '../util/Context'

export default function Detail() {
    const { contact } = useContext(Context)

    return (
        <div className="detail">
            <div className="group">
                <img src={avatar} alt="avatar" className="avatar" />
                <div className="input name">{contact.current.name || "name..."}</div>
            </div>

            <Divisor />

            <div className="group">
                <div className="label">Cell</div>
                <div className="input cell">{contact.current.cell || "cell..."}</div>
            </div>

            <Divisor bg={true} />

            <div className="group">
                <div className="label">Note</div>
                <div className="input note">{contact.current.note || "note..."}</div>
            </div>
        </div>
    )
}