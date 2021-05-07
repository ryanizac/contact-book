import React, { useContext } from 'react'
import Button from './Button'
import "./Menu.css"

import { Context } from '../util/Context'

export default function Menu() {
    const { setMode, deleteContact } = useContext(Context)

    return (
        <div className="menu">
            <Button onClick={() => {
                setMode(previous => ({...previous, update: true}))
            }}>
                Update
            </Button>
            <Button onClick={deleteContact}>
                Delete
            </Button>
        </div>
    )
}