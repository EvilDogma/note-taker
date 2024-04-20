// Basic Setup
const express = require('express')
const app = express()
const path = require('path')
const PORT = 3333

// pull in routes from index.js file in routes folder
const api = require('./routes');

// creat get routes for all html files in the public folder
app.use(express.static('public'))

// allow the server to accept string/array and json data in requests
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// 
app.use('/api', api);

// send the path /notes to the notes.htmlfile
app.get('/notes', (req, res) => {
    return res.sendFile(path.join(__dirname, '/public/notes.html'))
})

// redirect all bad paths back to the index.html page
app.get('/*', (req, res) => {
    return res.sendFile(path.join(__dirname, '/public/index.html'))
})

// start the express server
app.listen(PORT, () => {
    console.log('Server running on port: ', PORT)
})