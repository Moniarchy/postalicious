const express = require('express')
const app = express()

app.use(express.static(__dirname))

app.get('/', (request, response) => {
  response.render('./index.html')
})

app.listen(3001)
