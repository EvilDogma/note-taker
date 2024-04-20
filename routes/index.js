const router = require('express').Router();

const { v4: generateId } = require('uuid')
const fs = require('fs/promises')

async function getData(){
    const data = await fs.readFile('./db/db.json', 'utf8')
    return JSON.parse(data)
}

router.get('/notes', async (req, res) => {
    const data = await getData()
    return res.json(data)
})

router.post('/notes', async (req, res) => {
    const data = await getData()
    const id = generateId()
    data.push({
        ...req.body,
        id: id
    })
    await fs.writeFile('./db/db.json',JSON.stringify(data,null,2))
    res.json({ message: `Posted New Note with ID: ${id}` })
})

router.delete('/notes/:id', async (req, res) => {

    const data = await getData()
    let id = req.params.id
    const filtered = data.filter(obj => obj.id !== id)
    await fs.writeFile('./db/db.json',JSON.stringify(filtered,null,2))
    res.json({ message: `Deleted Note with ID: ${id}` })

})


module.exports = router;