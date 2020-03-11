# Federation-Response (FR)
The Federation Response module is a predefined response structure that is used by APIs in the API-Federation Ecosystem (AFE) to serve responses that conform to the R1-Response structure as defined by AFE.

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
### 2. API 
Federation-Response has the following 
