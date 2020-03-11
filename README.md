# Federation-Response (FR)
The Federation Response module is a predefined response structure that is used by APIs in the API-Federation Ecosystem (AFE) to serve responses that conform to the R1-Response structure as defined by AFE.
### Introduction

#### 1. Getting Started
Lets complete the stepts in the list below to get us started:
- require in your <code>store.js</code> file as <code>storefile</code>.
- run <code>$ npm install federation-response</code> in your project directory.
- require Response from federation-response.
- pass in the <code>storefile</code> as an argument to Response and new to create a new Response instance.
The code below illustrates the steps above:
```js
const storefile = require('./store.json')
const { Response } = require('federation-response')

const fres = new Response(storefile)
    .payloadTo({user:{id:1}, roles:[1,2,3]})
    .message('invalid_password')
    .done()

console.log(fres)
```
The code above would yield teh response below:
```js
Response {
  id: 7395,
  isFederationResponse: true,
  status: null,
  lang: 'en',
  payload: { user: { id: 1 }, roles: [ 1, 2, 3 ] },
  details: [
    {
      code: 'invalid_password',
      status: 422,
      state: 'validation',
      key: 'password',
      message: 'the password you entered is invalid'
    }
  ],
  directives: [],
  created: '3/11/2020, 2:12:26 PM'
}
```
### API Documentation
In this section, we will demonstrate how to use this module. for the remainder of this section, we will assume that fres has already been instantiated as illustrated below.
```js
const storefile = require('./store.json')
const { Response } = require('federation-response')

const fres = new Response(storefile)
```
#### 1. payloadTo()

The <code>payloadTo(any)</code> method takes in one argument of type <code>any</code>. The payloadTo method is used to set the payload attribute of your fres object. **Note:** if this method is called more than once on the <code>fres</code> instance, previously loaded payload data will be overwritten.
```js
    const data = [
        { id: 1, usernmae:'some-username'}
        { id: 2, usernmae:'some-other-username'}
    ]
    fres.payloadTo(data) 
```

#### 2. Messages 
#### 3. Directives  
