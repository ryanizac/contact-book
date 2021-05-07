import React, { useContext } from 'react'
import "./List.css"

import Contact from './Contact'
import { Context } from '../util/Context'

export default function List({ }) {
    const { filterFind, contact, detailContact, } = useContext(Context)

    return (
        <div className="list">
            {
                filterFind.newList.length === 0 ?
                    contact.list.map(item => {
                        return (
                            <Contact key={"contact" + item.id} {...item}
                                onClick={() => detailContact(item)} />
                        )
                    }) :
                    filterFind.newList.map(item => {
                        return (
                            <Contact key={"contact" + item.id} {...item}
                                onClick={() => detailContact(item)} />
                        )
                    })
            }
        </div>
    )
}