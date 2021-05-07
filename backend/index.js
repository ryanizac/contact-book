const fs = require("fs")
const cors = require("cors")
const bodyParser = require('body-parser')
const express = require("express")

const app = express()
const url = "http://localhost"
const port = 3001

app.use(cors())
app.use(bodyParser.json())

function findAll() {
    return fs.readFileSync("./db.json", { encoding: "utf-8" })
}

// list
app.get("/list", (req, res) => {
    return res.send(
        findAll()
    )
})

// create and update
app.post("/save", (req, res) => {
    const { id, name, cell, note } = req.body
    if (name && cell) {
        let dataAll = JSON.parse(findAll())
        // save
        if (id) {
            // update
            console.log("update contact");
            let indexContactFound = dataAll.findIndex(element => parseInt(element.id) === parseInt(id))
            dataAll[indexContactFound].name = name
            dataAll[indexContactFound].cell = cell
            dataAll[indexContactFound].note = note
            res.sendStatus(200)
        } else {
            // create
            console.log("create contact");
            const newId = dataAll.length ? (parseInt(dataAll[dataAll.length - 1].id) + 1) : 1
            const newContact = {id: newId, name, cell, note}
            dataAll.push(newContact)
            res.send({id: newId})
        }
        fs.writeFileSync("./db.json", JSON.stringify(dataAll))
        
    } else {
        // bad request
        console.log("bad request");
        res.sendStatus(403).send("Name and Cell not informed")
    }
})

// delete
app.delete("/delete", (req, res) => {
    const {id} = req.body
    if(id){
        // deleting
        let dataAll = JSON.parse(findAll())
        dataAll = dataAll.filter(element => parseInt(element.id) !== parseInt(id))
        fs.writeFileSync("./db.json", JSON.stringify(dataAll))
        res.sendStatus(200)
    }else{
        // bad request
        res.sendStatus(403).send("id is null")
    }
})

app.listen(port, () => {
    console.log(`App listen in ${url}:${port}`);
})