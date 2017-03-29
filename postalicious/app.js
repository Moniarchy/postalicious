const express = require('express')
const bodyParser = require('body-parser')
const httpRequest = require('request')
const app = express()

app.use(express.static(__dirname + '/public'))

app.get('/', (request, response) => {
  response.sendFile('index.html')
})

app.post('/ajax', (request, response) => {
  let body = request.body
  console.log('body', body)
  response.send('I finished')
})

app.listen(3001)
