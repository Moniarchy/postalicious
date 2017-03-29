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
  
  render(ajaxRequestOptions)
  return ajaxRequestOptions
}

function ajax() {
  const options = grabDom()
  fetch('//localhost:3001/ajax', {  
    method: 'post',
    headers: {
      'Accept': 'text/plain'
    },
    body: JSON.stringify(options)
  })
  .then(response => response.json())
  .then(responseJSON => {
    console.log(responseJSON)
    // TODO Dom manipulation to populate response DOM area
  })
  .catch(errorMsg => {
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

function render(domValues) {
  let requestWindow = document.querySelector('.request-body')
  if( 'url' in domValues && 'method' in domValues) {
    let urlParent = generateParent()
    generateElement('bold', 'request URL:', '10px', urlParent)
    generateElement('standard', domValues.url, '10px', urlParent)
    let methodParent = generateParent()
    generateElement('bold', 'request method:', '10px', methodParent)
    generateElement('standard', domValues.method, '10px', methodParent)
  }

  generateElement('bold', 'request Headers:', '10px', requestWindow, 0)
  if('headers' in domValues) {
    for( let headerKey in domValues.headers) {
      let headerParent = generateParent()
      generateElement('bold', headerKey, '20px', headerParent)
      generateElement('standard', domValues.headers[headerKey], '20px', headerParent)
    }
  }

  function generateElement(type, content, margin, parent, grow) {
    let element = document.createElement('p')
    if(type === 'bold') {
      element.style.fontWeight = '700'
    }
    element.style.display = 'flex'
    element.style.flexGrow = grow !== undefined ? grow : 1
    element.style.margin = '2 2 2 '+margin
    element.textContent = content
    parent.appendChild(element)
  }

  function generateParent() {
    let parent = document.createElement('div')
    parent.style.display = 'flex'
    parent.style.flexDirection = 'row'
    requestWindow.appendChild(parent)
    return parent
  }
}