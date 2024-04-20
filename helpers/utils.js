const fs = require('fs/promises')

async function getNotes() {
    const notes = await fs.readFile('./db/db.json', 'utf8')
    return JSON.parse(notes)
}

async function updateNotes(notes){
    fs.writeFile('./db/db.json', JSON.stringify(notes, null, 2))
    return console.log('updated Notes')
}

module.exports = { getNotes , updateNotes};