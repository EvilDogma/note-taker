const notes = require('express').Router();
const { v4: generateId } = require('uuid')
const { getNotes , updateNotes}= require('../helpers/utils.js')

notes.get('/', async (req, res) => {
    const notes = await getNotes()
    return res.json(notes)
})

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


module.exports = notes;