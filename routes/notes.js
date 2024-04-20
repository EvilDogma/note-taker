// set up notes router
const notes = require('express').Router();

// pull in the generateId function from uuid package and functions from helper utils file
const { v4: generateId } = require('uuid')
const { getNotes, updateNotes } = require('../helpers/utils.js')

// route to get notes
notes.get('/', async (req, res) => {
    const notes = await getNotes()
    return res.json(notes)
})

// route to post a new note
notes.post('/', async (req, res) => {
    const notes = await getNotes()
    const id = generateId()
    notes.push({
        ...req.body,
        id: id
    })
    await updateNotes(notes)
    return res.json({ message: `Posted New Note with ID: ${id}` })
})

// route to delete a note based on its id
notes.delete('/:id', async (req, res) => {
    const notes = await getNotes()
    let id = req.params.id
    const filteredNotes = notes.filter(obj => obj.id !== id)
    if (filteredNotes.length < notes.length) {
        await updateNotes(filteredNotes)
        return res.json({ message: `Deleted Note with ID: ${id}` })
    }
    return res.json({ message: `No Note Exists with ID: ${id}` })
})

// export notes router
module.exports = notes;