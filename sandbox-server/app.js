const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.text())

app.get('/', (request, response) => {
  response.type('text/plain')
  response.send('Welcome to Sandbox!')
})

app.get('/search', (request, response) => {
  response.type('text/plain')
  if(request.query.hasOwnProperty('q')) {
    response.send(`You searched for: ${request.query.q}`)
  } else {
    response.status(400)
    response.send('You didn\'t provide a search query term :(')
  }
})

app.post('/things', (request, response) => {
  response.status(201)
  response.send('New thing created: '+request.body)
})

app.get('/somefile', (request, response) => {

  response.status(200)
  let requestAcceptTypes = {
    'text/plain': {
      'method': 'send',
      'responseMessage': 'This is a plain text file'
    },
    'text/html': {
      'method': 'send',
      'responseMessage': '<!DOCTYPE html><html><body>This is an HTML file</body></html>'
    },
    'application/json': {
      'method': 'json',
      'responseMessage': { "title": "some JSON data" }
    }
  }

  for( let acceptType in requestAcceptTypes ) {
    let values = requestAcceptTypes[acceptType]
    if(request.accepts(acceptType)) {
      response.type(acceptType)
      response[values.method](values.responseMessage)
    }
  }
})

app.get('/old-page', (request, response) => {
  response.status(301)
  response.setHeader( 'Location', 'http://localhost:3000/newpage')
  response.send()
})

app.post('/admin-only', (request, response) => {
  response.sendStatus(403)
})

app.get('/not-a-page', (request, response) => {
  response.sendStatus(404)
})

app.get('/server-error', (request, response) => {
  response.sendStatus(500)
})

app.listen(3000)
