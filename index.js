const { template } = require('lodash')

class Response {
    
    constructor(storefile = null){
        if(!storefile) throw('storefile required!')
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

module.exports = { Response }