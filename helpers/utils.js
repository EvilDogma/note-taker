// use fs promises package
const fs = require('fs/promises')

// function to get saved notes
async function getNotes() {
    const notes = await fs.readFile('./db/db.json', 'utf8')
    return JSON.parse(notes)
}

// function to update saved notes
async function updateNotes(notes) {
    fs.writeFile('./db/db.json', JSON.stringify(notes, null, 2))
    return console.log('updated Notes')
}

// export both functions
module.exports = { getNotes, updateNotes };