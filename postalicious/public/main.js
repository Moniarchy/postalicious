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
}