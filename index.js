const express = require('express')
const app = express()

app.use(express.json())

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

// # get info request
app.get('/info', (req, res) => {
  const currentDate = new Date().toLocaleString()
  res.send(
    `
    <div>
      <h1>info</h1>
      <p>Phonebook has info for: ${persons.length} people</p>
      <p>${currentDate}</p>
    </div>
    `
  )
})

// # get single contact
// app.get('/api/person/:id', (req, res) => {

// })

// # app liste port
app.listen(PORT, () => {
  console.log(`App running on PORT: ${PORT}`);
})