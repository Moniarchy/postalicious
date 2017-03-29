'use strict'

function grabDom() {
  let values = document.querySelectorAll('.inputFields *')
  let filteredValues = []
  values.forEach( element => {
    if( element.tagName === "INPUT" || element.tagName === "TEXTAREA" ) {
      filteredValues.push({
        'id': element.id,
        'value': element.value
      })
    }
  })
  let options = {
    'url': filteredValues[1],
    'qs': {
      [filteredValues[2]]: filteredValues[5],
      [filteredValues[3]]: filteredValues[6],
      [filteredValues[4]]: filteredValues[7]
    },
    'method': filteredValues[0].toUpperCase(),
    'headers': {
      [filteredValues[8]]: filteredValues[11],
      [filteredValues[9]]: filteredValues[12],
      [filteredValues[10]]: filteredValues[13]
    },
    'body': filteredValues[14]
  }
}
