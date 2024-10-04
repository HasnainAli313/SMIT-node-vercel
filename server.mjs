import express from 'express'
import cors from 'cors'

const PORT = 3000
const app = express()

app.use(cors()) 
app.use(express.json());

const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
]

function errorHandler(err, req, res, next) {
    res.status(err.status || 500).json({
        message: err.message || 'Something went wrong',
        error: true
    })
}


app.get('/api/users', (req, res) => {
    res.status(200).json({ message: 'Fetched all users!', data: users })
})


app.post('/api/users', (req, res) => {
    const body = req.body;

    const newUser = {
        id: users.length + 1,
        ...body
    }

    users.push(newUser)
    res.status(201).json({ message: 'New user created!', data: newUser })
})

app.put('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id)
    const userIndex = users.findIndex(user => user.id === userId)

    if (userIndex !== -1) {
        const updatedUser = { ...users[userIndex], ...req.body }

        // update user in array
        users[userIndex] = updatedUser
        res.status(200).json({ message: `User with id ${userId} updated 😊`, updatedUser })
    } else {
        res.status(404).json({ message: `User with id ${userId} not found 😢` })
    }
})


app.delete('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id)
    const userIndex = users.findIndex(user => user.id === userId)

    if (userIndex !== -1) {
        // remove user from array
        // const deletedUser = users.splice(userIndex, 1)
        users.splice(userIndex, 1)
        res.status(200).json({ message: `User with id ${userId} deleted 😊` })
    } else {
        res.status(404).json({ message: `User with id ${userId} not found 😢` })
    }
})


app.use(errorHandler)



app.listen(PORT, () => {
    console.log(`Server is listening here: http://localhost:${PORT}`)
})
