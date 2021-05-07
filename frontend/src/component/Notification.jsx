import React, { useContext, useEffect } from 'react'
import './Notification.css'

import { Context } from '../util/Context'

export default function Notification({ value }) {
    const { notification } = useContext(Context)

    let style = {}
    if (notification.bad === null) {
        style = {background: "white", color: "black"}
    }else if(notification.bad === false){
        style = {background: "green", color: "white"}
    }else {
        style = {background: "red", color: "white"}
    }

    return (
        <div className="notification" style={style}>
            {notification.message}
        </div>
    )
}