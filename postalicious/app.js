const express = require('express')
const app = express()

app.use(express.static(__dirname + '/public'))

app.get('/', (request, response) => {
  response.sendFile('index.html')
})

app.listen(3001)
