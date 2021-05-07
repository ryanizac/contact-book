import React, { useContext, useState } from 'react'
import ReactDOM from 'react-dom'
import './ChangePanel.css'

import avatar from '../assets/img/contact.png'
import Divisor from './Divisor'
import Button from './Button'

import { Context } from '../util/Context'
import { useEffect } from 'react/cjs/react.development'

const initialData = {
    name: "", cell: "", note: ""
}

export default function ChangePanel({ }) {
    const { breakModes, mode, updateContact, createContact, contact } = useContext(Context)

    const [data, setData] = useState(initialData)

    useEffect(() => {
        if(!mode.create && mode.update){
            setData({
                id: contact.current.id,
                name: contact.current.name,
                cell: contact.current.cell,
                note: contact.current.note
            })
        }

        return () => setData(initialData)
    }, [])

    function onChange(e) {
        let {name, value} = e.target
        setData(previous => ({ ...previous, [name]: (value) }))
    }

    return (
        ReactDOM.createPortal(
            <div className="change-panel">
                <div className="box-panel">
                    <div className="group">
                        <img src={avatar} alt="avatar" className="avatar" />
                        <input className="input name" type="text" name="name"
                            value={data.name} onChange={onChange} placeholder="name" />
                    </div>

                    <Divisor />

                    <div className="group">
                        <div className="label">Cell</div>
                        <input className="input cell" type="text" name="cell"
                            value={data.cell} onChange={onChange} placeholder="cell" />
                    </div>

                    <Divisor bg={true} />

                    <div className="group">
                        <div className="label">Note</div>
                        <textarea className="input note" type="text" name="note"
                            value={data.note} onChange={onChange} placeholder="note"></textarea>
                    </div>

                    <div className="group group-buttons">
                        <Button onClick={mode.create && !mode.update ? () => createContact(data) : () => updateContact(data)}>{mode.create && !mode.update ? "Save" : "Update"}</Button>
                        <Button onClick={breakModes}>Cancel</Button>
                    </div>
                </div>
            </div>,
            document.querySelector("#modal")
        )
    )
}