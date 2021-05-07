import React, { useContext } from 'react'
import "./List.css"

import Contact from './Contact'
import { Context } from '../util/Context'

export default function List({ }) {
    const { contact, detailContact } = useContext(Context)

    return (
        <div className="list">
            {contact.list.map(item => {
                return (
                    <Contact key={"contact" + item.id} {...item}
                        onClick={() => detailContact(item)} />
                )
            })}
        </div>
    )
}