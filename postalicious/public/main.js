'use strict'

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
  
  renderRequest(ajaxRequestOptions)
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
    renderResponse(responseJSON)
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
    generateElement('bold', 'request URL:', '0px', urlParent, 1)
    generateElement('standard', domValues.url, '0px', urlParent, 5)

    let methodParent = generateParent(requestWindow)
    generateElement('bold', 'request method:', '0px', methodParent, 1)
    generateElement('standard', domValues.method, '0px', methodParent, 5)
  }

  generateElement('bold', 'request Headers:', '0px', requestWindow, 0)
  if('headers' in domValues) {
    for( let headerKey in domValues.headers) {
      let headerParent = generateParent(requestWindow)
      generateElement('bold', headerKey+':', '10px', headerParent, 1)
      generateElement('standard', domValues.headers[headerKey], '0px', headerParent, 5)
    }
  }
}

function renderResponse(domValues) {
  let responseWindow = document.querySelector('.response-body')
  cleanDom(responseWindow)
  if('error' in domValues){
    // TODO Display error information like status code etc.
  } else {
    let bodyContainer = generateParent(responseWindow)
    generateElement('bold', 'body:', '0px', bodyContainer, 1)
    generateElement('standard', domValues.body, '0px', bodyContainer, 5, true)

    let httpVersionContainer = generateParent(responseWindow)
    generateElement('bold', 'http version:', '0px', httpVersionContainer, 1)
    generateElement('standard', domValues.httpVersion, '0px', httpVersionContainer, 5)

    let statusCodeContainer = generateParent(responseWindow)
    generateElement('bold', 'status code:', '0px', statusCodeContainer, 1)
    generateElement('standard', domValues.statusCode, '0px', statusCodeContainer, 5)

    generateElement('bold', 'response Headers:', '0px', responseWindow, 0)
    let headerParentContainer = generateParent(responseWindow)
    headerParentContainer.style.flexDirection = 'column'
    headerParentContainer.style.height = '400px'
    if('headers' in domValues) {
      for( let headerKey in domValues.headers) {
        let headerParent = generateParent(headerParentContainer)
        generateElement('bold', headerKey+':', '10px', headerParent, 1)
        generateElement('standard', domValues.headers[headerKey], '0px', headerParent, 5)
      }
    }
  }
}

function generateElement(type, content, left, parent, grow, overflow) {
  let element = document.createElement('p')
  if(type === 'bold') {
    element.style.fontWeight = '700'
  }
  // TODO Fix styling issue when too much text is displayed in headers and body - overlap occurs
  element.style.display = 'flex'
  element.style.width = '150px'
  element.style.flexGrow = grow !== undefined ? grow : 1
  element.style.margin = '9px 2px 9px 10px'
  element.style.position = 'relative'
  element.style.left = left
  if(overflow) {
    element.style.overflow = 'auto'
    element.style.maxHeight = '350px'
  }
  element.textContent = content
  parent.appendChild(element)
}

function generateParent(mainWindow) {
  let parent = document.createElement('div')
  parent.style.display = 'flex'
  parent.style.flexDirection = 'row'
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

// window.addEventListener('load')



    // case 'click':
  //lose focus
  //keydown when no inputs are focused
