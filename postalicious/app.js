const express = require('express')
const bodyParser = require('body-parser')
const httpRequest = require('request')
const app = express()

app.use(express.static(__dirname + '/public'))
app.use(bodyParser.text())

app.get('/', (request, response) => {
  response.sendFile('index.html')
})

app.post('/ajax', (request, response) => {
  let options = JSON.parse(request.body)
  httpRequest(options, (error, sbResponse, body) => {
    if(error) {
      console.log('ERROR:', error)
      response.send({'error': error})
    }
    response.send({
      'headers': sbResponse.headers,
      'body': body,
      'statusCode': sbResponse.statusCode,
      'httpVersion': sbResponse.httpVersion
    })
  })
})

app.get('/favicon.ico', (req, res) => {
  res.sendStatus(204)
})

app.listen(3001)
