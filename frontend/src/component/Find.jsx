import React, { useContext } from 'react'
import "./Find.css"

import { Context } from '../util/Context'

export default function BoxFind({ children, ...props }) {
    const { filterFind, setFilterFind } = useContext(Context)

    return (
        <input className="find" value={filterFind.filterFind} {...props}
            onChange={(e) => setFilterFind(previous => ({...previous, value: e.target.value}))} />
    )
}