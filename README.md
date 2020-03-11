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
In this section, we will demonstrate how to use this module. for the remainder of this section, we will assume that <code>fres</code> has already been instantiated as illustrated below.
```js
const storefile = require('./store.json')
const { Response } = require('federation-response')

const fres = new Response(storefile)
```
#### 1. Payload

#####  - payloadTo()

The <code>payloadTo(any)</code> method takes in one argument of type <code>any</code>. The payloadTo method is used to set the payload attribute of your fres object. **Note:** if this method is called more than once on the <code>fres</code> instance, previously loaded payload data will be overwritten.
```js
    const data = [
        { id: 1, usernmae:'some-username'}
        { id: 2, usernmae:'some-other-username'}
    ]
    fres.payloadTo(data) 
```

#### 2. Messages 

#####  - message()

The <code>message(string, object)</code> method takes in two arguments. The first is of type string and the second is an optional object. The first argument string should match a notification key in your store file if a match can't be found it will add a default error to details. The second parameter should only be provided if the corresponding notification is a template notification. Template notifications include placeholder words that are denoted by words enclosed by curly braces preceded by a dollar sign like so: <code>${this-is-a-key-word}</code>. If the data object contains an object with property names matching the keywords, the keywords will be replaced by the matching values in the data object. 

Let us consider the example below to help us better understand the conditions explained above. For this example we will assume the following:
- storefile contains two notifications: 
 - <code>happy_birthday</code>
 - <code>authenticated_user</code>
- happy_birthday is a template notification, which means that it contains replaceable keywords.

Here are the two notification strings represented before they are renderd:
```js
    let happy_birthday = 'happy ${age}th birthday ${name}!'
    let authenticated_user = 'welcome back!'
```

General notification example:
```js
    fres.message('authenticated_user') // outputs - 'welcome back!'
```

Template notification example:
```js
    const data = { name: 'some-username', age: 18}
    fres.message('happy_birthday', data) // outputs - 'happy 18th birthday some-username!'
```
#### 3. Directives  
Directives are the server's way of telling a client to do something. To illustrate the relevance of this, let us consider a malicious client that tries to access a user's data by providing a tampered JWT. If we detect that the signature is invalid we can send instructions to the client to clear local storage or make an entry in local storage to block this client from retrying. **Node:** directives are just text send along with the response, it is up to the front-end developer to write logic to handle them. Directives are added to the directives array be the <code>directiveTo(string)</code> method.

```js
    fres.directiveTo('directive_name') 
```

