'use strict'

console.log('I\'m loading')

function grabDom() {
  let values = document.querySelectorAll('.inputFields *')
  let filteredValues = []
  values.forEach( element => {
    if( element.tagName === "INPUT" || element.tagName === "TEXTAREA" ) {
      filteredValues.push(element.value)
    }
  })

  // TODO: Javascript error handling BEFORE the send button is clicked
  // event handlers on loseFocus for each input field

  filteredValues[0] = filteredValues[0] ? filteredValues[0].toUpperCase() : 'GET'

  return {
    'url': filteredValues[1],
    'qs': {
      [filteredValues[2]]: filteredValues[5],
      [filteredValues[3]]: filteredValues[6],
      [filteredValues[4]]: filteredValues[7]
    },
    'method': filteredValues[0],
    'headers': {
      [filteredValues[8]]: filteredValues[11],
      [filteredValues[9]]: filteredValues[12],
      [filteredValues[10]]: filteredValues[13]
    },
    'body': filteredValues[14]
  }
}

function ajax() {
  const options = grabDom()
  fetch('//localhost:3001/ajax', {  
    method: 'post', 
    body: options // TODO Im not working, help me!
  })
  .then( response => {
    console.log('client side: ', response)
  }).catch( error => {
    console.error('Oh no, you ', error, '\'d')
  })
}