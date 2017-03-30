'use strict'

function grabDom() {
  const QUERY_COUNT = 3
  const HEADER_COUNT = 3
  let values = document.querySelectorAll('.inputFields *')
  let filteredValues = {}
  values.forEach( element => {
    if( element.tagName === 'INPUT' || element.tagName === 'TEXTAREA' ) {
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

  let payloadRequestOptions = {
    'url': filteredValues.form_host,
    'method': filteredValues.form_method || 'GET',
    'body': filteredValues.form_body
  }

  if(Object.keys(qs).length > 0) {
    payloadRequestOptions.qs = qs
  }

  if(Object.keys(headers).length > 0) {
    payloadRequestOptions.headers = headers
  }
  
  renderRequest(payloadRequestOptions)
  return payloadRequestOptions
}

function ajax() {
  const options = grabDom()
  const timeBefore = Date.now()
  fetch('//localhost:3001/ajax', {  
    method: 'post',
    headers: {
      'Accept': 'text/plain'
    },
    body: JSON.stringify(options)
  })
  .then(response => response.json())
  .then(responseJSON => {
    renderResponse(responseJSON, timeBefore)
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

function renderRequest(domValues) {
  let requestWindow = document.querySelector('.request-body')
  cleanDom(requestWindow)
  if( 'url' in domValues && 'method' in domValues) {
    let urlParent = generateParent(requestWindow)
    generateElement('bold', 'request URL:', urlParent, 1)
    generateElement('standard', domValues.url, urlParent, 5)

    let methodParent = generateParent(requestWindow)
    generateElement('bold', 'request method:', methodParent, 1)
    generateElement('standard', domValues.method, methodParent, 5)
  }

  generateElement('bold', 'request Headers:', requestWindow, 0)
  if('headers' in domValues) {
    for( let headerKey in domValues.headers) {
      let headerParent = generateParent(requestWindow)
      generateElement('bold', headerKey+':', headerParent, 1)
      headerParent.lastChild.style.left = '10px'
      generateElement('standard', domValues.headers[headerKey], headerParent, 5)
    }
  }

  generateElement('bold', 'query parameters:', requestWindow, 0)
  if('qs' in domValues) {
    for( let queryKey in domValues.qs) {
      let queryParent = generateParent(requestWindow)
      generateElement('bold', queryKey+':', queryParent, 1)
      queryParent.lastChild.style.left = '10px'
      generateElement('standard', domValues.qs[queryKey], queryParent, 5)
    }
  }
}

function renderResponse(domValues, timeBefore) {
  let responseWindow = document.querySelector('.response-body')
  cleanDom(responseWindow)
  if('error' in domValues){
    // TODO Display error information like status code etc.
  } else {
    let timeDifference = []
    if(domValues.headers && domValues.headers.date) {
      let currentTime = Date.parse(domValues.headers.date)
      console.log('currentTime', currentTime, ', timeBefore', timeBefore)
      let minutesAJAX = Math.floor(Math.abs(Math.floor((timeBefore-currentTime) / 1000) / 60))
      let secondsAJAX = Math.floor(Math.abs(Math.floor((timeBefore-currentTime) / 1000) % 60))
      timeDifference[0] = 'Minutes: ' + minutesAJAX + ', Seconds: ' + secondsAJAX

      let currentTimePL = Date.now()      
      console.log('currentTimePL', currentTimePL, ', timeBefore', timeBefore)
      let minutesRender = Math.floor(Math.abs(Math.floor((timeBefore-currentTimePL) / 1000) / 60))
      let secondsRender = Math.floor(Math.abs(Math.floor((timeBefore-currentTimePL) / 1000) % 60))
      timeDifference[1] = 'Minutes: ' + minutesRender + ', Seconds: ' + secondsRender
    }
    let bodyContainer = generateParent(responseWindow)
    bodyContainer.style.minHeight = '350px'
    generateElement('bold', 'body:', bodyContainer, 1)
    generateElement('standard', domValues.body, bodyContainer, 5, true)

    let timeToRespondAJAX = generateParent(responseWindow)
    generateElement('bold', 'time taken for response:', timeToRespondAJAX, 1)
    generateElement('standard', timeDifference[0], timeToRespondAJAX, 5, true) 

    let timeToRespondPL = generateParent(responseWindow)
    generateElement('bold', 'time taken for render:', timeToRespondPL, 1)
    generateElement('standard', timeDifference[1], timeToRespondPL, 5, true)

    let httpVersionContainer = generateParent(responseWindow)
    generateElement('bold', 'http version:', httpVersionContainer, 1)
    generateElement('standard', domValues.httpVersion, httpVersionContainer, 5)

    let statusCodeContainer = generateParent(responseWindow)
    generateElement('bold', 'status code:', statusCodeContainer, 1)
    generateElement('standard', domValues.statusCode, statusCodeContainer, 5)

    generateElement('bold', 'response Headers:', responseWindow, 0)
    let headerParentContainer = generateParent(responseWindow)
    headerParentContainer.style.flexDirection = 'column'
    headerParentContainer.style.height = '400px'
    if('headers' in domValues) {
      for( let headerKey in domValues.headers) {
        let headerParent = generateParent(headerParentContainer)
        generateElement('bold', headerKey+':', headerParent, 1)
        headerParent.lastChild.style.left = '10px'
        generateElement('standard', domValues.headers[headerKey], headerParent, 5)
      }
    }
  }
}

function generateElement(type, content, parent, grow, overflow) {
  let element = document.createElement('p')
  if(type === 'bold') {
    element.style.fontWeight = '700'
  }
  // TODO Fix styling issue when too much text is displayed in headers and body - overlap occurs
  element.style.flexGrow = grow !== undefined ? grow : 1
  element.className = 'requestResponseNode'
  if(overflow) {
    element.className = element.className + ' overflow'
  }
  element.textContent = content
  parent.appendChild(element)
}

function generateParent(mainWindow) {
  let parent = document.createElement('div')
  parent.className = 'requestResponseParent'
  mainWindow.appendChild(parent)
  return parent
}

function cleanDom(windowToClean) {
  while (windowToClean.hasChildNodes()) {
    windowToClean.removeChild(windowToClean.lastChild)
  }
}

window.addEventListener('load', () => { 
  document.querySelector('#buildRequest')
    .addEventListener('click', grabDom)
  document.querySelector('#buildSend')
    .addEventListener('click', ajax)
})

// TODO: On lose focus - error validate the input boxes
// on keydown (enter) don't submit form if textbox currently active