const express = require('express')
const app = express()
const path = require('path')

const api = require('./routes');

const PORT = 3333

// creat get routes for all html files in the public folder
app.use(express.static('public'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use('/api', api);

app.get('/notes', (req, res) => {
    return res.sendFile(path.join(__dirname, '/public/notes.html'))
})

app.get('/*', (req, res) => {
    return res.sendFile(path.join(__dirname, '/public/index.html'))
})

app.listen(PORT,() => {
    console.log('Server running on port: ', PORT)
})