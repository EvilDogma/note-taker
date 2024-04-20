const express = require('express')
const app = express()
const path = require('path')
const { v4: generateId } = require('uuid')

const fs = require('fs/promises')

const PORT = 3333

async function getData(){
    const data = await fs.readFile('./db/db.json', 'utf8')
    return JSON.parse(data)
}

// creat get routes for all html files in the public folder
app.use(express.static('public'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.get('/notes', (req, res) => {
    return res.sendFile(path.join(__dirname, '/public/notes.html'))
})


app.get('/api/notes', async (req, res) => {
    const data = await getData()
    return res.json(data)
})

app.post('/api/notes', async (req, res) => {
    const data = await getData()
    const id = generateId()
    data.push({
        ...req.body,
        id: id
    })
    await fs.writeFile('./db/db.json',JSON.stringify(data,null,2))

    res.json({ message: `Posted New Note with ID: ${id}` })
})

app.delete('/api/notes/:id', async (req, res) => {

    const data = await getData()
    let id = req.params.id
    const filtered = data.filter(obj => obj.id !== id)
    await fs.writeFile('./db/db.json',JSON.stringify(filtered,null,2))
    res.json({ message: `Deleted Note with ID: ${id}` })


})

app.get('/*', (req, res) => {
    return res.sendFile(path.join(__dirname, '/public/index.html'))
})

async function getData(){
    const data = await fs.readFile('./db/db.json', 'utf8')
    return JSON.parse(data)
}


app.listen(PORT,() => {
    console.log('Server running on port: ', PORT)
})