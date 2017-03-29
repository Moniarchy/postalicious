'use strict'
var debug
console.log('I\'m loading')

function grabDom() {
  const QUERY_COUNT = 3
  const HEADER_COUNT = 3
  let values = document.querySelectorAll('.inputFields *')
  let filteredValues = {}
  values.forEach( element => {
    if( element.tagName === "INPUT" || element.tagName === "TEXTAREA" ) {
      if(element.value) {
        filteredValues[element.id] = element.value
      }
    }
  })

  // TODO: Javascript error handling BEFORE the send button is clicked
  // event handlers on loseFocus for each input field

  let qs = populateObj(QUERY_COUNT, 'query', filteredValues)
  let headers = populateObj(HEADER_COUNT, 'header', filteredValues)

  // If they forgot to include http:// then add it in for them; Let them type domain only
  if(!/$http\:\/\//.test(filteredValues.form_host)) {
    if(!filteredValues.form_host) {
      filteredValues.form_host = 'localhost:3000'
    }
    filteredValues.form_host = 'http://'+filteredValues.form_host
  }

  let ajaxRequestOptions = {
    'url': filteredValues.form_host,
    'method': filteredValues.form_method || 'GET',
    'body': filteredValues.form_body
  }

  if(Object.keys(qs).length > 0) {
    ajaxRequestOptions.qs = qs
  }

  if(Object.keys(headers).length > 0) {
    ajaxRequestOptions.headers = headers
  }
  
  console.log(ajaxRequestOptions)
  return ajaxRequestOptions
}

function ajax() {
  const options = grabDom()
  fetch('//localhost:3001/ajax', {  
    method: 'post',
    headers: {
      'Accept': 'text/plain'
    },
    body: JSON.stringify(options) // TODO Im not working, help me!
  })
  .then( response => {
    let responseJSON = response.clone().json()
    if('error' in responseJSON) {
      let errorText = response.text()
      throw errorText
    }
    return responseJSON
    // TODO How do we deal with the server throwing us error objects when
    // fetch forces us to use their Response object?
    // running response.json() forces EVERYTHING passed back into a json

  })
  .then( responseJSON => {
    console.log(responseJSON)
    // TODO Dom manipulation to populate response DOM area
  })
  .catch( errorMsg => {
    console.error(errorMsg)
  })
}

function populateObj(count, type, container) {
  let tempObj = {}
  for(let i = 0; i < count; i++) {
    if('form_'+type+'Key'+i in container && 'form_'+type+'Value'+i in container) {
      tempObj[container['form_'+type+'Key'+i]] = container['form_'+type+'Value'+i]
    }
  }
  return tempObj
}