const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (request, response) => {
  response.type('text/plain')
  response.send('Welcome to Sandbox!')
})

app.get('/search', (request, response) => {
  response.type('text/plain')
  if(request.query.hasOwnProperty('q') && request.query.q === 'doodads') {
    response.send('You searched for: "doodads"')
  } else {
    response.send('Your search isn\'t part of the spec')
  }
})

app.listen(3000)
