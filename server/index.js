const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = 4000

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/', (request, response)=> {
    response.json({info: 'Node, Express, Postgres API'})
}) 

app.get('/users', db.getUsers)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)
app.delete('/users/:id', db.deleteUser)

app.listen(port, () => {
    console.log(`App running on: http://localhost:4000`)
})
