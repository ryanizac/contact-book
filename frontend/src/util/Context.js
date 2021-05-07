import React, { useState } from "react"
import { useEffect } from "react/cjs/react.development"
import ChangePanel from "../component/ChangePanel"

const baseURL = "http://localhost:3001"

export const Context = React.createContext({})

const initialStateMode = {
    update: false,
    create: false
}

const initStateNotification = {
    message: "Notifications will appear here", bad: null
}

export function ContextConfigMain({ children }) {
    const [notification, setNotification] = useState(initStateNotification)

    const [mode, setMode] = useState(initialStateMode)

    const [contact, setContact] = useState({
        list: [{}],
        current: {}
    })

    // frits request in server - list, get all
    useEffect(() => {
        fetch(`${baseURL}/list`, {
            method: 'GET',
            headers: new Headers(),
            mode: 'cors',
            cache: 'default'
        }).then(data => data.json()).then(data => {
            setContact(({ current: data[0] || {}, list: data || [{}] }))
        })
    }, [])

    useEffect(() => {
        organizeList()
    }, [contact.current])

    function organizeList() {
        console.log("Ordenando lista de contatos pelo nome");
        setContact(previous => ({
            ...previous,
            // current: previous.list.find(element => element.id === contact.current.id) || {},
            list: previous.list.sort((a, b) => a.name.localeCompare(b.name))
        }))
    }

    const detailContact = (contact) => {
        console.log("Selecting contact " + contact.name);
        setContact(previous => ({ ...previous, current: contact }))
        setNotification(initStateNotification)
    }

    const deleteContact = () => {
        if (Object.keys(contact.current).length !== 0) {
            fetch(`${baseURL}/delete`, {
                method: 'DELETE',
                body: JSON.stringify({ id: contact.current.id }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                mode: 'cors',
                cache: 'default'
            }).then(data => {
                if (data.status === 200) {
                    console.log("deleting contact " + contact.current.name);
                    setContact(previous => ({
                        list: previous.list.filter(element => element !== contact.current),
                        current: previous.list.find(element => element.id !== contact.current.id) || {}
                    }))
                    setNotification({
                        message: "contact deleted",
                        bad: false
                    })
                }else{
                    setNotification({
                        message: "problme deleting contact",
                        bad: false
                    })
                }
            })
        } else {
            console.log("Não há um contato selecionado");
        }
    }

    const updateContact = (upContact) => {
        fetch(`${baseURL}/save`, {
            method: 'POST',
            body: JSON.stringify(upContact),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            cache: 'default'
        }).then(data => {
            if (data.status === 200) {
                setContact(previous => {
                    let tempNewList = previous.list.filter(
                        element => element.id !== contact.current.id
                    ) || {}
                    tempNewList.push(upContact)
                    return ({ current: upContact, list: tempNewList })
                })

                setNotification({
                    message: "contact updated",
                    bad: false
                })
            }else{
                setNotification({
                    message: "problem updating contact",
                    bad: true
                })
            }
        })

        breakModes()
    }

    const createContact = (newContact) => {
        console.log('creating new contact');

        // create id with server...
        fetch(`${baseURL}/save`, {
            method: 'POST',
            body: JSON.stringify(newContact),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            cache: 'default'
        }).then(data => data.json()).then(data => {
            if (data) {
                console.log("Registrando novo contact");
                setContact(previous => {
                    let tempNewList = previous.list
                    newContact.id = data.id
                    tempNewList.push(newContact)

                    return ({
                        current: newContact,
                        list: tempNewList
                    })
                })
                setNotification({
                    message: "contact created",
                    bad: false
                })
            }else{
                setNotification({
                    message: "problem creating contact",
                    bad: true
                })
            }
        })

        breakModes()
    }

    const breakModes = () => {
        setMode(initialStateMode)
    }

    return (
        <Context.Provider value={{
            notification, setNotification,
            contact, setContact,
            mode, setMode,
            detailContact, deleteContact,
            updateContact, createContact,
            breakModes
        }}>
            {mode.create || mode.update ? <ChangePanel /> : ""}
            {children}
        </Context.Provider>
    )
}