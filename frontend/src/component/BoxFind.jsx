import React, { useContext } from 'react'
import "./BoxFind.css"

import Find from './Find'
import Button from './Button'

import { Context } from '../util/Context'

export default function BoxFind() {
    const { setMode } = useContext(Context)

    return (
        <div className="box-find">
            <Find placeholder="Find contact here..." />
            <Button onClick={
                () => setMode(previous => ({ ...previous, create: true }))
            }>Create</Button>
        </div>
    )
}