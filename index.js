const express = require('express')
const app = express()

const PORT = 3001

const persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

// # get all persons request
app.get('/api/persons/', (req, res) => {
  const data = res.json(persons)
})

// # get single contact
// app.get('/api/person/:id', (req, res) => {

// })

// # app liste port
app.listen(PORT, () => {
  console.log(`App running on PORT: ${PORT}`);
})