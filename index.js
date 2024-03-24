const express = require('express')
const app = express()
const morgan = require('morgan')
app.use(express.json())
app.use(morgan('tiny'))

const PORT = 3001 

let persons = [
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

// #01 get all persons request
app.get('/api/persons/', (req, res) => {
  const data = res.json(persons)
})

// #02 get info request
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

// #03 get single contact
app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)
  
  if (person) {
    res.json(person)
    // res.send(`
    //   <div>
    //       <p>Resource ID: <strong>${person.id}</strong></p>
    //       <p>Name: <strong>${person.name}</strong></p>
    //       <p>Number: <strong>${person.number}</strong></p>
    //   </div>
    // `)
  } else {
    res.statusMessage =`The resource with ID: ${id} has not been found`
    res.status(404).end()
    console.log(res.statusMessage)
  }
})

// #04 delete entry request
app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id != id)
  res.status(204).end() 
  console.log(`The person with ID: ${id} has been removed`);
})

// #05 create new entry request
app.post('/api/persons', (req, res) => {
  const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
  }
  
  const body = req.body
  const person = {
    id: generateId(),
    name: body.name,
    number: body.number
  }
  
  if (!body.name || !body.number) {
    return res.status(400).json({
    error: 'Some content is missing!'
    })
  } else if (persons.some(person => person.name === body.name)) {
    return res.status(400).json({
      error: `The person ${body.name} hass already been added, NAME MUST BE UNIQUE!`
      })
  }
  
  persons = persons.concat(person)
  res.json(person)
})

// #00 app liste port 
app.listen(PORT, () => {
  console.log(`App running on PORT: ${PORT}`);  
})
