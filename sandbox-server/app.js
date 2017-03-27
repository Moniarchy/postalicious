const express = require('express')
const app = express()

app.get('/', (request, response) => {
  response.type('text/plain')
  response.send('Welcome to Sandbox!')
})

app.listen(3000)
