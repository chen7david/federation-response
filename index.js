const dd = (val) => console.log(val)
const { template } = require('lodash')
const store = require('./store.json')
class Response {
    
    constructor(storefile = null){
        if(!store) throw('storefile required!')
        this.id = Math.floor((Math.random() * 9000) + 1000)
        this.isFederationResponse = true
        this.status = null
        this.lang = 'en'
        this.payload = null
        this.details = []
        this.directives = []
        this.created = new Date().toLocaleString()
        this.store = storefile
    }

    statusTo(status){
        this.status = status
        return this
    }

    langTo(lang){
        this.lang = lang
        return this
    }

    isSilent(){
        this.silent = true
    }

    message(code, data = null){
        let message = code
        if(this.store){
            let notification = this.store.notifications.find(el => el.name == code)
            if(!notification) notification = this.store.notifications
                .find(el => el.name == 'invalid_message_code')
            if(notification) message = this.mutate(notification, data)
            if(message.state == 'error') message.message = `${message.message} - ${this.id}`
        }
        this.details.push(message)
        return this
    }

    messageTo(message){
        this.details.push(message)
        return this
    }

    mutate(notification, data){
        let detail = notification.details.find(el => el.lang == this.lang)
        return {
            code: notification.name,
            status: notification.status,
            state: notification.state,
            key: detail.key,
            message: data ? template(detail.message)(data) : detail.message
        }
    }

    payloadTo(data){
        this.payload = data
        return this
    }

    directiveTo(directive){
        this.directives.push(directive)
        return this
    }

    done(){
        delete this.store
        return this
    }

    throw(){
        throw(this)
    }
}

let fres = new Response(store)
    .payloadTo({user:{id:1}, roles:[1,2,3]})
    .message('invalid_password')
    .message('authenticated_user')
    .message('authenticated_user', {username: 'some-cool-name'})
    .message({first:'custom message'})
    .messageTo({message:'this is a custom message'})
    .done()

    // const fres = new Response(store)
    // .payloadTo({user:{id:1}, roles:[1,2,3]})
    // .message('invalid_password')
    // .done()

dd(fres)
module.exports = { Response }